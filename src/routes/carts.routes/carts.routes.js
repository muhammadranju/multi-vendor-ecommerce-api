const router = require("express").Router();
const { controller: cart } = require("../../api/v1/cart");
const { ROLES } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.route("/").get(authMiddleware(ROLES.CUSTOMER), cart.findAll);
router.route("/").post(authMiddleware(ROLES.CUSTOMER), cart.create);

router.route("/:productId").patch(authMiddleware(ROLES.CUSTOMER), cart.update);
router
  .route("/:productId")
  .delete(authMiddleware(ROLES.CUSTOMER), cart.deleteItem);

router.route("/empty").delete(authMiddleware(ROLES.CUSTOMER), cart.deleteAll);

module.exports = router;
