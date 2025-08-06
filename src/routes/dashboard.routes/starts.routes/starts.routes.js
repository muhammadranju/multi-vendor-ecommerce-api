const router = require("express").Router();
const {
  controller: starts,
} = require("../../../api/v1/dashboard/manageStarts");
const { ROLES } = require("../../../constants");
const { authMiddleware } = require("../../../middleware/auth.middleware");

router
  .route("/starts/orders-starts")
  .get(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), starts.orderStarts);
router
  .route("/starts/payments-starts")
  .get(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), starts.paymentsStarts);
router
  .route("/starts/users-starts")
  .get(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), starts.usersStarts);
router
  .route("/starts/reviews-starts")
  .get(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), starts.reviewsStarts);
router
  .route("/starts/comments-starts")
  .get(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), starts.commentsStarts);
router
  .route("/starts/products-starts")
  .get(authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN), starts.productsStarts);

module.exports = router;
