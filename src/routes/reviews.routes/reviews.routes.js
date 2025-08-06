const router = require("express").Router();
// const reviews = require("../../controller/comments.controller/comments.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");
const { controller: reviews } = require("../../api/v1/reviews");

const { ROLES, PERMISSIONS } = require("../../constants");

router.route("/reviews").get(authMiddleware(ROLES.CUSTOMER), reviews.findAll);

router.route("/reviews").post(authMiddleware(ROLES.CUSTOMER), reviews.create);

// router
//   .route("/reviews/:reviewId")
//   .get(authMiddleware(ROLES.CUSTOMER), reviews.findSingle);

router
  .route("/reviews/:reviewId")
  .put(
    authMiddleware(
      ROLES.CUSTOMER,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
      ROLES.MANAGER
    ),
    reviews.update
  );
router
  .route("/reviews/:reviewId")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MANAGER),
    checkPermission({ permission: PERMISSIONS.CREATE_BRAND }),
    reviews.deleteReview
  );

module.exports = router;
