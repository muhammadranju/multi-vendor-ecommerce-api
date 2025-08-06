const Role = require("../../../../models/Role.model/Role.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const updateRoleController = asyncHandler(async (req, res) => {
  const { permissionIds } = req.body;
  const roleId = req.params.id;

  const role = await Role.findById(roleId);
  if (!role) throw new ApiError(404, "Role not found");

  // Check if required fields are provided
  if (!roleId || !permissionIds) {
    throw new ApiError(400, "You must be provide name and description");
  }

  // Check if the role already exists
  // if (
  //   role.permissions.includes(new mongoose.Types.ObjectId(...permissionIds))
  // ) {
  //   throw new ApiError(400, "Permission already exists");
  // }

  // role.permissions.push(...permissionIds);
  role.permissions.addToSet(...permissionIds);

  console.log(role);

  await role.save();

  return res.status(200).json(new ApiResponse(200, role, "Role updated"));
});

module.exports = updateRoleController;
