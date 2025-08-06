const Role = require("../../../../models/Role.model/Role.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const deleteRoleController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const permission = await Role.findById(id);
  if (!permission) throw new ApiError(404, "Permission not found");

  await permission.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(204, permission, "Permission deleted"));
});

module.exports = deleteRoleController;
