const signup = require("./signup");
const login = require("./login");
const forgotPassword = require("./forgotPassword");
const changePassword = require("./changePassword");
const resetPassword = require("./resetPassword");
const emailVerification = require("./emailVerification");
const OTPVerification = require("./OTPVerification");
const logout = require("./logout");
const googleLogin = require("./googleLogin");
module.exports = {
  signup,
  login,
  forgotPassword,
  changePassword,
  resetPassword,
  emailVerification,
  OTPVerification,
  logout,
  googleLogin,
};
