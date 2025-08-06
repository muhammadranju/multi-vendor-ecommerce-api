const Permission = require("../../../../models/Permission.model/Permission.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const findAllPermissionsController = asyncHandler(async (req, res) => {
  const permissions = await Permission.find()
    .select("_id name")
    .sort({ createdAt: 1 });

  const links = [
    {
      rel: "self",
      href: `${req.apiHost}/admin/permissions`,
      method: "GET",
    },
    {
      rel: "create",
      href: `${req.apiHost}/admin/permissions`,
      method: "POST",
    },
    // Add more links as needed
  ];
  return res
    .status(200)
    .json(
      new ApiResponse(200, { permissions, links }, "Retrieved all permissions")
    );
});

module.exports = findAllPermissionsController;
