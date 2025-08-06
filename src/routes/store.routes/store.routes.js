const router = require("express").Router();
const { store } = require("../../api/v1/seller");
const { ROLES, PERMISSIONS } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");

router.route("/").get(store.findAll);
router.route("/:storeId").get(store.findSingle);

router
  .route("/")
  .post(
    authMiddleware(ROLES.SELLER, ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.CREATE_STORE }),
    store.create
  );

router
  .route("/:storeId")
  .patch(
    authMiddleware(ROLES.SELLER, ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.EDIT_STORE }),
    store.update
  );

router
  .route("/:storeId")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_STORE }),
    store.deleteShop
  );

module.exports = router;
