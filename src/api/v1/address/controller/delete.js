const Address = require("../../../../models/Address.model/Address.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const { ApiVersion } = require("../../../../constants");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const addressDeleteController = asyncHandler(async (req, res) => {
  // Destructuring addressId from request parameters
  const { addressId } = req.body;
  const userId = req.user?.userId;

  validateFieldsCheck(req.body, ["addressId"]);

  const address = await Address.findOne({ _id: addressId, userId });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }
  console.log(address);

  // Delete the address from database
  await address.deleteOne();

  const host = `${req.myHost}${ApiVersion}`;
  const links = [
    {
      rel: "self",
      href: `${host}/users/profile/address`,
      method: "GET",
      description: "Get Addresses",
    },
    {
      rel: "create",
      href: `${host}/users/profile/address`,
      method: "POST",
      description: "Create Addresses",
    },
  ];

  // Returning success response with deleted address
  return res
    .status(200)
    .json(
      new ApiResponse(204, { address, links }, "Address delete successfully.")
    );
});

module.exports = addressDeleteController;
