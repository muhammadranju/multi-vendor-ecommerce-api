const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const { ApiVersion } = require("../../../../constants");

const userDeleteController = asyncHandler(async (req, res) => {
  // Extract userId from the request object
  const { userId } = req.params;

  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Delete the user from the database
  user.isDeleted = true;
  await user.save();

  const host = `${req.myHost}${ApiVersion}`;
  const links = [
    {
      rel: "self",
      href: `${host}/users/profile`,
      method: "GET",
      description: "Get user profile",
    },
    {
      rel: "update",
      href: `${host}/users/profile`,
      method: "PUT",
      description: "Update user profile",
    },
  ];

  // Return a success response with the deleted user
  return res
    .status(200)
    .json(
      new ApiResponse(204, { user: null, links }, "User deleted successfully.")
    );
});

module.exports = userDeleteController;
