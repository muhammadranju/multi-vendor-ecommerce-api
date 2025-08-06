const Store = require("../../../../../models/Store.model/Store.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const findAll = asyncHandler(async (req, res) => {
  // Find all stores in the database
  const stores = await Store.find();

  // Check if any stores exist in the database and throw an error if none exist
  if (!stores) {
    throw new ApiError(404, "No stores found");
  }

  const host = req.apiHost;

  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${host}/seller/stores`,
      method: "GET",
      description: "Get all stores",
    },
    {
      rel: "create-store",
      href: `${host}/seller/stores`,
      method: "POST",
      description: "Create a new store",
    },
  ];

  // Return the stores as a JSON response with a 200 status code (OK) and a success message
  return res
    .status(200)
    .json(new ApiResponse(200, { stores, links }, "Stores found successfully"));
});

module.exports = findAll;
