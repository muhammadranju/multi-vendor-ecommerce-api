const Address = require("../../../../models/Address.model/Address.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const { ApiVersion } = require("../../../../constants");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const createAddressController = asyncHandler(async (req, res) => {
  // Destructuring request body for address details
  const {
    addressName,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    phoneNumber,
    companyName,
    isDefaultDelivery,
    isDefaultBilling,
  } = req.body;

  // Checking if required fields are missing
  validateFieldsCheck(req.body, [
    "addressName",
    "addressLine1",
    "city",
    "state",
    "postalCode",
    "phoneNumber",
  ]);

  // Fetching the user by user ID from request
  // const user = await User.findById({ _id: req.user.userId });

  // Creating a new address instance
  const address = new Address({
    userId: req.user.userId,
    addressName,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    phoneNumber,
    companyName,
    isDefaultDelivery,
    isDefaultBilling,
  });

  await address.save();

  const host = `${req.myHost}${ApiVersion}`;
  const links = [
    {
      rel: "self",
      href: `${host}/users/profile/address`,
      method: "GET",
      description: "Get Addresses",
    },
    {
      rel: "update",
      href: `${host}/users/profile/address`,
      method: "PUT",
      description: "Update Addresses",
    },
    {
      rel: "delete",
      href: `${host}/users/profile/address`,
      method: "DELETE",
      description: "Delete Addresses",
    },
  ];

  // Returning success response with the created address
  return res
    .status(201)
    .json(
      new ApiResponse(201, { address, links }, "Address created successfully.")
    );
});

module.exports = createAddressController;
