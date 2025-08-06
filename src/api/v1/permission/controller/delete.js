const Permission = require("../../../../models/Permission.model/Permission.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const deletePermissionController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const permission = await Permission.findById(id);
  if (!permission) throw new ApiError(404, "Permission not found");

  await permission.deleteOne();

  const links = [
    {
      rel: "all-permissions",
      method: "GET",
      href: `/api/v1/permissions`,
    },
    {
      rel: "create-permission",
      method: "POST",
      href: `/api/v1/permissions`,
    },
  ];

  return res
    .status(200)
    .json(new ApiResponse(200, { permission, links }, "Permission deleted"));
});

module.exports = deletePermissionController;
