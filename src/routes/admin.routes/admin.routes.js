const router = require("express").Router();
const permissions = require("../../api/v1/permission/controller");

const roles = require("../../api/v1/role/controller");
const { ROLES, PERMISSIONS } = require("../../constants");

const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");

// permissions routes
router
  .route("/permissions/assign-permission")
  .patch(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.UPDATE_PERMISSIONS }),
    permissions.assignPermission
  );
router
  .route("/permissions")
  .post(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.CREATE_PERMISSIONS }),
    permissions.createPermission
  );
router
  .route("/permissions")
  .get(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.VIEW_PERMISSIONS }),
    permissions.findAllPermissions
  );
router
  .route("/permissions/:id")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_PERMISSIONS }),
    permissions.deletePermission
  );

// roles routes
router
  .route("/roles")
  .post(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.CREATE_ROLES }),
    roles.createRole
  );

router
  .route("/roles")
  .get(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.VIEW_ROLES }),
    roles.findAllRoles
  );
router
  .route("/roles/:id")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_ROLES }),
    roles.deleteRole
  );
router.route("/roles/:id").patch(
  //  authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  // checkPermission({ permission: "update_roles" }),
  roles.updateRole
);

router
  .route("/roles/remove/:id")
  .patch(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.UPDATE_ROLES }),
    roles.removeRole
  );

router
  .route("/roles/assign-role")
  .post(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.ASSIGN_ROLES }),
    roles.assignRolesToUser
  );
router
  .route("/roles/assign-role/:userId")
  .get(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.VIEW_ROLES }),
    roles.getUserRoles
  );

module.exports = router;
