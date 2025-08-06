const express = require("express");
const passport = require("passport");
const { controller: auth } = require("../../api/v1/auth");
const { controller: refreshToken } = require("../../api/v1/refreshToken");

const router = express.Router();

// LOCAL REGISTER & LOGIN
router.route("/signup").post(auth.signup);
// router.route("/login").post(auth.login);
router
  .route("/login")
  .post(passport.authenticate("local", { session: false }), auth.login);

// FORGOT PASSWORD
router.route("/forgot-password").post(auth.forgotPassword);

// RESET PASSWORD
router.route("/reset-password").post(auth.resetPassword);

// OTP VERIFICATION
router.route("/verify-otp").post(auth.OTPVerification);

// LOGOUT
router.route("/logout").post(auth.logout);

// GOOGLE LOGIN
router.route("/google").get(async (req, res, next) => {
  const redirect = req.query.redirect || "/";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect,
  })(req, res, next);
});
router.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173",
  }),
  auth.googleLogin
);

// FACEBOOK LOGIN
router
  .route("/facebook")
  .get(passport.authenticate("facebook", { scope: ["email"], session: false }));
router
  .route("/facebook/callback")
  .get(
    passport.authenticate("facebook", { session: false, failureRedirect: "/" }),
    auth.login
  );

// APPLE LOGIN
router.route("/apple").get(passport.authenticate("apple", { session: false }));
router
  .route("/apple/callback")
  .get(
    passport.authenticate("apple", { session: false, failureRedirect: "/" }),
    auth.login
  );

router.post("/refresh-token", refreshToken.refreshToken);
module.exports = router;
