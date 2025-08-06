const {
  ApiVersion,
  UserStatusEnum,
  VerifyStatus,
} = require("../../../../constants");
const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const crypto = require("crypto");

const userEmailVerify = async ({ value }) => {
  // Find a user with the provided email verification token
  return await await User.findOne({
    emailVerificationToken: value,
    emailVerificationExpiry: { $gt: Date.now() },
  });
};

const emailVerificationService = async (req) => {
  // Get verification token from params
  const { verificationToken } = req.params;

  // Check if verification token is missing
  if (!verificationToken) {
    throw new ApiError(400, "Email verification token is missing");
  }

  // Create hashed token from the verification token
  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Get user using the verification token
  const email = await userEmailVerify({ value: hashedToken });

  // Check if the user is valid
  if (!email) {
    throw new ApiError(409, {
      error: "Token is invalid or expired",
      rel: "login",
      href: `${req.myHost}${ApiVersion}/auth/login`,
      method: "POST",
      description: "Login",
    });
  }
  // Update the user's email verification status and approval status
  // Now we can remove the associated email token and expiry date as we no  longer need them
  email.emailVerificationToken = undefined;
  email.emailVerificationExpiry = undefined;
  email.isEmailVerified = VerifyStatus.VERIFY;
  email.status = UserStatusEnum.APPROVED;

  // Save the user to the database (validateBeforeSave is set to false)
  await email.save({ validateBeforeSave: false });

  return email;
};

module.exports = emailVerificationService;
