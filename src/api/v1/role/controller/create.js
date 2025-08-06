const Role = require("../../../../models/Role.model/Role.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const createRoleController = asyncHandler(async (req, res) => {
  const { name, permissionIds } = req.body;

  // Check if required fields are provided
  if (!name) {
    throw new ApiError(400, "You must be provide name and description");
  }

  const existing = await Role.findOne({ name });
  if (existing) throw new ApiError(400, "Role already exists");

  // Create a new role

  const role = await Role.create({ name, permissions: permissionIds });

  // Respond with the created role
  return res.status(201).json(new ApiResponse(201, role, "Role created"));
});

module.exports = createRoleController;
