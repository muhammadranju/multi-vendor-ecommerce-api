const Store = require("../../../../../models/Store.model/Store.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const deleteShop = asyncHandler(async (req, res) => {
  // Destructure the storeId from the request parameters object
  const { storeId } = req.params;

  // Find the store in the database using the storeId
  const findStore = await Store.findOne({
    $or: [{ storeUID: storeId }, { storeURI: storeId }],
  });

  // Check if the store exists in the database and throw an error if it doesn't exist
  if (!findStore) {
    throw new ApiError(404, "Store not found");
  }

  // Delete the store from the database
  // await findStore.deleteOne();

  const host = req.apiHost;

  // HATEOAS links
  const links = [
    {
      rel: "create-shop",
      href: `${host}/seller/stores`,
      method: "POST",
      description: "Create a new shop",
    },
  ];

  // Return the store as a JSON response with a 200 status code (OK) and a success message
  return res
    .status(200)
    .json(
      new ApiResponse(204, { findStore, links }, "Store deleted successfully")
    );
});

module.exports = deleteShop;
