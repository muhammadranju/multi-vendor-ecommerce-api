const Address = require("../../../../models/Address.model/Address.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const { ApiVersion } = require("../../../../constants");
const { default: mongoose } = require("mongoose");

const findSingleAddressController = asyncHandler(async (req, res) => {
  // Destructuring addressId from request parameters
  const { addressId } = req.params;
  const userId = req.user?.userId;

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(
      400,
      "Invalid address id. Please provide a valid address id."
    );
  }

  const address = await Address.findOne({ _id: addressId, userId });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  // Creating HATEOAS links for the retrieved address
  const host = `${req.myHost}${ApiVersion}`;

  const links = [
    {
      rel: "self",
      href: `${host}/user/profile/address`,
      method: "GET",
      description: "Get Addresses",
    },
    {
      rel: "delete",
      href: `${host}/user/profile/address`,
      method: "DELETE",
      description: "Get Addresses",
    },
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(200, { address, links }, "Address fetched successfully.")
    );
});

module.exports = findSingleAddressController;
