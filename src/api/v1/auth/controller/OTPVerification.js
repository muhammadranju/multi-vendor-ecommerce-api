const {
  UserStatusEnum,
  VerifyStatus,
  ApiVersion,
} = require("../../../../constants");
const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const userOTPVerify = async ({ otp }) => {
  return await User.findOne({
    verificationCode: otp,
    verificationCodeExpiry: { $gt: Date.now() },
  });
};

const otpVerificationController = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    throw new ApiError(400, "OTP is missing");
  }

  const user = await userOTPVerify({ otp });

  if (!user) {
    throw new ApiError(409, {
      error: "OTP is invalid or expired",
      rel: "resend-otp",
      href: `${req.myHost}${ApiVersion}/auth/resend-otp`,
      method: "POST",
      description: "Resend OTP",
    });
  }

  // Clear OTP fields after verification
  user.verificationCode = undefined;
  user.verificationCodeExpiry = undefined;
  user.isEmailVerified = VerifyStatus.VERIFY;
  user.status = UserStatusEnum.APPROVED;

  await user.save({ validateBeforeSave: false });

  const links = [
    {
      rel: "resend-otp",
      href: `${req.myHost}/users/profile/send-otp`,
      method: "GET",
      description: "Verify Email",
    },
    {
      rel: "login",
      href: `${req.apiHost}/auth/reset-password`,
      method: "POST",
      description: "Login to your account",
    },
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user, links }, "OTP verification successful.")
    );
});

module.exports = otpVerificationController;
