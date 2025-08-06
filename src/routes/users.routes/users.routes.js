const router = require("express").Router();
const { controller: user } = require("../../api/v1/user");
const { ROLES } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.route("/profile").get(authMiddleware(ROLES.CUSTOMER), user.findSingle);

router
  .route("/profile/change-email")
  .patch(authMiddleware(ROLES.CUSTOMER), user.changeEmail);

router
  .route("/profile/send-otp")
  .post(authMiddleware(ROLES.CUSTOMER), user.sentOtp);

router.route("/profile").patch(authMiddleware(ROLES.CUSTOMER), user.update);
router
  .route("/change-password")
  .post(authMiddleware(ROLES.CUSTOMER), user.changePassword);

router.route("/verify").get(authMiddleware(ROLES.CUSTOMER), user.verify);

router
  .route("/set-password")
  .post(authMiddleware(ROLES.CUSTOMER), user.setPassword);

router
  .route("/account/delete_account")
  .delete(
    authMiddleware(ROLES.CUSTOMER, ROLES.ADMIN, ROLES.SUPER_ADMIN),
    user.deleteAccount
  );
module.exports = router;
