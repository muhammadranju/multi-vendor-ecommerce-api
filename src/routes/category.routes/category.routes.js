// Import necessary modules and utilities
const router = require("express").Router();
const {
  controller: category,
} = require("../../api/v1/dashboard/manageCategory");
const { ROLES, PERMISSIONS } = require("../../constants");
const { authMiddleware } = require("../../middleware/auth.middleware");
const checkPermission = require("../../middleware/checkPermission");

// const upload = require("../../middleware/multer.middleware");
// Define routes for category operations

// Route to get a single category by its ID
router.route("/:categoryId").get(category.findSingle);

// Route to get all categories
router.route("/").get(category.findAll);

// Route to create a new category
// Requires admin authentication, sets abilities, and checks if the user can perform the 'create' action on 'Categories'
// router.route("/").post(upload.single("image"), category.create);
router
  .route("/")
  .post(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.CREATE_CATEGORIES }),
    category.create
  );

// Route to update an existing category by its ID
// Requires admin authentication, sets abilities, and checks if the user can perform the 'update' action on 'Categories'
router
  .route("/:categoryId")
  .patch(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.UPDATE_CATEGORIES }),
    category.update
  );

// Route to delete a category by its ID
// Requires admin authentication, sets abilities, and checks if the user can perform the 'delete' action on 'Categories'
router
  .route("/:categoryId")
  .delete(
    authMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    checkPermission({ permission: PERMISSIONS.DELETE_CATEGORIES }),
    category.deleteBrand
  );

// Export the router to be used in other parts of the application
module.exports = router;
