const router = require("express").Router();
const { controller: comment } = require("../../api/v1/comment");
const { ROLES, PERMISSIONS } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");

router.route("/comments").get(authMiddleware(ROLES.CUSTOMER), comment.findAll);

router.route("/comments").post(authMiddleware(ROLES.CUSTOMER), comment.create);

router
  .route("/comments/:commentId")
  .put(authMiddleware(ROLES.CUSTOMER), comment.update);

router
  .route("/comments/:commentId")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_COMMENT }),
    comment.deleteReview
  );

module.exports = router;
