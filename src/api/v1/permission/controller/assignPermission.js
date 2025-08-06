const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const assignPermissionController = asyncHandler(async (req, res) => {
  const { userId, permissionIds } = req.body;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  user.permissions = [...new Set([...user.permissions, ...permissionIds])];
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Permissions assigned"));
});

module.exports = assignPermissionController;
