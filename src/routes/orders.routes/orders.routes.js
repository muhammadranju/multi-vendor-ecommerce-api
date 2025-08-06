const router = require("express").Router();
const { controller: order } = require("../../api/v1/order");

router.route("/view/:orderId").get(order.findSingle);
router.route("/:orderId").patch(order.update);

router.route("/:orderId/confirm").delete(order.deleteItem);

router.route("/tracking").get(order.orderTracking);
router.route("/").post(order.create);

router.route("/").get(order.findAll);

module.exports = router;
