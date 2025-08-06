const router = require("express").Router();
const { controller: brand } = require("../../api/v1/dashboard/manageBrands");
const { ROLES, PERMISSIONS } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");

/**
 * Restricts access to the specified user roles.
 * @param {...UserRolesEnum} roles - The user roles to restrict access for.
 * @returns {Array<string>} An array of restricted user roles.
 */

router.route("/").get(brand.findAll);
router.route("/:brandId").get(brand.findSingle);

router
  .route("/")
  .post(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.CREATE_BRAND }),
    brand.create
  );
router
  .route("/:brandId")
  .patch(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.UPDATE_BRAND }),
    brand.update
  );
router
  .route("/:brandId")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_BRAND }),
    brand.deleteBrand
  );

module.exports = router;
