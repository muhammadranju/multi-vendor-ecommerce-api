const router = require("express").Router();
const { controller: address } = require("../../api/v1/address/");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { ROLES } = require("../../constants");

router
  .route("/profile/addresses")
  .get(authMiddleware(ROLES.CUSTOMER), address.findAll);
router
  .route("/profile/address")
  .post(authMiddleware(ROLES.CUSTOMER), address.create);

router
  .route("/profile/address/:addressId")
  .get(authMiddleware(ROLES.CUSTOMER), address.findSingleAddressController);

router
  .route("/profile/address")
  .patch(authMiddleware(ROLES.CUSTOMER), address.update);
router
  .route("/profile/address")
  .delete(authMiddleware(ROLES.CUSTOMER), address.deleteAddress);

module.exports = router;
