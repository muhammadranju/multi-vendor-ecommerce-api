const router = require("express").Router();
const { controller: wishlist } = require("../../api/v1/wishlist");
const { ROLES } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.route("/").get(authMiddleware(ROLES.CUSTOMER), wishlist.findAll);
router.route("/").post(authMiddleware(ROLES.CUSTOMER), wishlist.create);
router.route("/").delete(authMiddleware(ROLES.CUSTOMER), wishlist.deleteItem);

module.exports = router;
