const User = require("../../../../models/User.model/User.model");
const {
  sendEmail,
  emailOTPVerificationMailgenContent,
} = require("../../../../services/emailSend.service");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const sentOtp = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { OTP, OTPExpiry } = user.generateTemporaryOTP();

  user.verificationCode = OTP;
  user.verificationCodeExpiry = OTPExpiry;
  await user.save();

  // Send email with the password reset link
  sendEmail({
    email: user?.email,
    subject: "Your Email Verification Code",
    mailgenContent: emailOTPVerificationMailgenContent(
      `${user?.name}`,
      `${OTP}`
    ),
  });

  const host = req.apiHost;
  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${host}/users/verify`,
      method: "GET",
      description: "Verify OTP",
    },
    {
      rel: "resend-otp",
      href: `${host}/users/resend-otp`,
      method: "POST",
      description: "Resend OTP",
    },
  ];

  return res
    .status(200)
    .json(new ApiResponse(200, { user, links }, "OTP sent successfully."));
});

module.exports = sentOtp;
