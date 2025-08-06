const Permission = require("../../../../models/Permission.model/Permission.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const createPermissionController = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Check if required fields are provided
  if (!name || !description) {
    throw new ApiError(400, "You must be provide name and description");
  }

  const existing = await Permission.findOne({ name });

  if (existing) {
    throw new ApiError(400, "Permission already exists");
  }

  // Create a new permission

  const permission = await Permission.create({
    name,
    description,
  });

  // Respond with the created permission
  return res
    .status(201)
    .json(new ApiResponse(201, permission, "Permission created"));
});

module.exports = createPermissionController;
