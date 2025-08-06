const User = require("../../../../models/User.model/User.model");
const {
  sendEmail,
  forgotPasswordMailgenContent,
} = require("../../../../services/emailSend.service");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const {
  generateTemporaryOTP,
} = require("../../../../utils/generateTemporaryToken");

const forgotPasswordController = asyncHandler(async (req, res) => {
  // Get User Email from frontend side.
  const { email } = req.body;

  const host = req.apiHost;
  // Check if user with the provided email exists
  const user = await User.findOne({ email });

  // If no user found, return an error
  if (!user) {
    throw new ApiError(400, `User not found: ${email}`);
  }

  // Generate temporary token for password reset
  const { OTP, OTPExpiry } = generateTemporaryOTP();

  // Set the generated token and expiry in the user object
  user.verificationCode = OTP;
  user.verificationCodeExpiry = OTPExpiry;

  // Save the user with the generated token and expiry (validateBeforeSave is set to false)
  await user.save({ validateBeforeSave: false });

  // Send email with the password reset link
  sendEmail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(`${user?.name}`, `${OTP}`),
  });

  // HATEOAS links
  const links = [
    {
      rel: "verify-otp",
      href: `${host}/auth/verify-otp`,
      method: "PATCH",
    },
    // Add more links as needed
  ];

  // Respond with success message
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { email: user?.email },
        links,
        "Password reset mail has been sent on your mail id"
      )
    );
});

module.exports = forgotPasswordController;
