const router = require(`express`).Router();
const { controller: auth } = require("../../api/v1/seller/auth");
const { controller: profile } = require("../../api/v1/seller/profile");
const { authMiddleware } = require("../../middleware/auth.middleware");
const rateLimiter = require("../../utils/rateLimit.utils");
const { ROLES } = require("../../constants");

// this route is reset password route patch using method
router.route(`/auth/reset-password/:resetToken`).patch(auth.resetPassword);

// this route send code on email verify token
router
  .route(`/auth/verify-email/:verificationToken`)
  .get(auth.emailVerification);

// register route using post method
router.route(`/auth/register`).post(rateLimiter, auth.signup);

// login route using post method
router.route(`/auth/login`).post(rateLimiter, auth.login);
// register forgot password using post method
router.route(`/auth/forgot-password`).post(auth.forgotPassword);

// protected routes start
// logout route using post method
router.route(`/auth/logout`).post(authMiddleware(ROLES.SELLER), auth.logout);

router
  .route(`/profile/:seller_id`)
  .get(authMiddleware(ROLES.SELLER), profile.findOne);

router.route(`/profile`).get(authMiddleware(ROLES.SELLER), profile.findSingle);

router.route(`/profile/`).patch(authMiddleware(ROLES.SELLER), profile.update);

module.exports = router;
