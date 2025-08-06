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

const changeEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = req.user;

  if (!otp) {
    throw new ApiError(400, "OTP is missing");
  }

  if (user.email !== email) {
    const user = await User.findOne({ email });
    if (user) {
      throw new ApiError(400, "Email already exists");
    }
  }

  const findNewUser = await userOTPVerify({ otp });

  if (!findNewUser) {
    throw new ApiError(409, "OTP is invalid or expired");
  }

  // const findNewUser = await User.findOne({ email: req?.user.email });

  findNewUser.verificationCode = undefined;
  findNewUser.verificationCodeExpiry = undefined;

  findNewUser.email = email;
  await findNewUser.save({ validateBeforeSave: false });

  const host = req.apiHost;

  const links = [
    {
      rel: "self",
      href: `${host}/users/change-email`,
      method: "POST",
      description: "Change your email",
    },
    {
      rel: "profile",
      href: `${host}/users/profile}`,
      method: "GET",
      description: "View Profile",
    },
    {
      rel: "logout",
      href: `${host}/users/logout`,
      method: "POST",
      description: "Logout",
    },
  ];

  return res
    .status(200)
    .json(new ApiResponse(200, { user, links }, "Email changed successfully"));
});
module.exports = changeEmail;
