const { ApiVersion } = require("../../../../constants");
const Address = require("../../../../models/Address.model/Address.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const retrieveAddressController = asyncHandler(async (req, res) => {
  // Gating the addresses in to database
  const address = await Address.find({ userId: req.user.userId });
  if (!address.length > 0) {
    throw new ApiError(404, "No address added.");
  }

  const host = `${req.myHost}${ApiVersion}`;
  // Creating HATEOAS links for each address
  const links = [
    {
      rel: "create",
      href: `${host}/user/profile/address`,
      method: "POST",
      description: "Create Addresses",
    },
    {
      rel: "update",
      href: `${host}/user/profile/address`,
      method: "PUT",
      description: "Update Addresses",
    },
    {
      rel: "delete",
      href: `${host}/user/profile/address`,
      method: "DELETE",
      description: "Delete Addresses",
    },
  ];

  // Response the addresses data
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { count: address.length, address, links },
        "Address grt successfully."
      )
    );
});

module.exports = retrieveAddressController;
