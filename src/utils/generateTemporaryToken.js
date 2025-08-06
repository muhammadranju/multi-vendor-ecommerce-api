const crypto = require("crypto");
const generateTemporaryToken = () => {
  // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const SELLER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + SELLER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};

const generateTemporaryOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * digits.length)];
  }
  // This otp should be client facing
  // for example: for email verification unHashedOTP should go into the user's mail
  //   const OTP = generateOTP(4);
  const USER_TEMPORARY_OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
  // This is the expiry time for the oTP (5 minutes)
  const OTPExpiry = Date.now() + USER_TEMPORARY_OTP_EXPIRY;
  return { OTP, OTPExpiry };
};

module.exports = { generateTemporaryToken, generateTemporaryOTP };
