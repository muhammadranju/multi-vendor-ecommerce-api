const Role = require("../../../../models/Role.model/Role.model");
const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

// ➤ Assign role(s) to a user
const assignRolesToUser = asyncHandler(async (req, res) => {
  const { userId, roleIds } = req.body;

  console.log(req.body);

  // Check if required fields are provided
  if (!userId || !roleIds || !Array.isArray(roleIds)) {
    throw new ApiError(400, "You must provide userId and roleIds array");
  }

  // Validate roles exist
  const roles = await Role.find({ _id: { $in: roleIds } });
  if (roles.length !== roleIds.length) {
    throw new ApiError(400, "Some roles do not exist");
  }

  // Assign roles to user
  const user = await User.findByIdAndUpdate(
    userId,
    { role: roleIds },
    { new: true }
  ).populate("role");

  if (!user) throw new ApiError(404, "User not found");

  return res.json(new ApiResponse(200, user, "Roles assigned successfully"));
});

// ➤ Get roles of a user
const getUserRoles = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate("roles");
  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, user.role, "User roles fetched"));
});

module.exports = {
  assignRolesToUser,
  getUserRoles,
};
