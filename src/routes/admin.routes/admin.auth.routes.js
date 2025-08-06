const router = require("express").Router();

const adminAuth = require("../../api/v1/admin/controller");
const { ROLES } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.route("/auth/login").post(adminAuth.login);
router
  .route("/auth/signup")
  .post(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), adminAuth.signup);
// router.route("/auth/logout").post();

module.exports = router;
