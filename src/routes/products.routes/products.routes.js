const router = require("express").Router();
const { controller: product } = require("../../api/v1/product/");
const { ROLES, PERMISSIONS } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");
// Define validation and sanitization rules

router.route("/").get(product.findAll);
router.route("/:productId").get(product.findSingle);

router
  .route("/")
  .post(
    authMiddleware(ROLES.SELLER, ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.CREATE_PRODUCT }),
    product.create
  );

router
  .route("/:productId")
  .patch(
    authMiddleware(ROLES.SELLER, ROLES.ADMIN, ROLES.USER_MANAGER),
    checkPermission({ permission: PERMISSIONS.EDIT_PRODUCT }),
    product.update
  );
router
  .route("/:productId")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_PRODUCT }),
    product.deleteProduct
  );

module.exports = router;
