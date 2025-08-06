const Role = require("../../../../models/Role.model/Role.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const findAllRolesController = asyncHandler(async (req, res) => {
  const roles = await Role.aggregate([
    {
      $lookup: {
        from: "permissions", // this should match your MongoDB collection name
        localField: "permissions", // field in Role model
        foreignField: "_id", // field in Permission model
        as: "permissions",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, roles, "Retrieved all roles"));
});

module.exports = findAllRolesController;
