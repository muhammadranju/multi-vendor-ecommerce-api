const mongoose = require("mongoose");
const Role = require("../../../../models/Role.model/Role.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const removeRoleController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { permissionIds } = req.body;

  if (!permissionIds) throw new ApiError(400, "You must provide roleId");

  if (!Array.isArray(permissionIds)) {
    throw new ApiError(400, "permissionIds must be an array");
  }

  const validObjectIds = permissionIds.map((id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, `Invalid permission ID: ${id}`);
    }
    return new mongoose.Types.ObjectId(id);
  });

  const role = await Role.findById(id);
  if (!role) throw new ApiError(404, "Role not found");

  // Check if 'roles' exists and is an array
  if (!Array.isArray(role.permissions)) {
    throw new ApiError(
      500,
      "'roles' field is missing or not an array in Role model"
    );
  }

  role.permissions.pull(...validObjectIds);

  console.log(role.permissions.length);

  await role.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, role, "Permission removed successfully from role")
    );
});

module.exports = removeRoleController;
