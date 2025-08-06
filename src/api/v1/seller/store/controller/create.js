const randomstring = require("randomstring");
const slugify = require("slugify");

const Store = require("../../../../../models/Store.model/Store.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");
const Seller = require("../../../../../models/Seller.model/Seller.model");

/**
 * Asynchronously creates a new shop in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} The JSON response containing the created shop.
 */
const createStore = asyncHandler(async (req, res) => {
  // Destructure the shop data from the request body
  const { storeName, storeDescription, storeAddress, logo, banner } = req.body;

  // console.log(req.body);

  // Get the sellerId from the request object or request body
  const sellerId = req.user.userId;

  // Find the seller and store in the database
  const [isSeller, isStore] = await Promise.all([
    Seller.findById(sellerId),
    Store.findOne({ sellerId }),
  ]);

  // Check if the store already exists in the database
  console.log(isStore);

  if (isStore) {
    throw new ApiError(409, "This seller already has a store");
  }

  // Check if the seller exists in the database
  if (!isSeller) {
    throw new ApiError(404, "Seller not found");
  }

  // Check if all required fields are present in the request body
  if (!storeName || !storeDescription || !storeAddress) {
    throw new ApiError(400, "All fields are required");
  }

  // Generate a random URL link for the shop
  const createStoreUrlLink = `${slugify(storeName)}-${randomstring.generate({
    length: 7,
    charset: "alphanumeric",
  })}`.toLowerCase();

  // Prepare store data for creation
  const storeData = {
    storeName,
    storeDescription,
    storeAddress,
    logo,
    banner,
    sellerId,
    storeURI: createStoreUrlLink,
  };

  // Create a new store object with the prepared data
  const store = new Store(storeData);
  isSeller.shopId = store._id;

  // Save the store to the database
  await store.save();
  await isSeller.save({ validateBeforeSave: true });

  // Define the host for HATEOAS links
  const host = req.apiHost;

  // Define HATEOAS links for the response
  const links = [
    {
      rel: "self",
      href: `${host}/store/${store.storeURI}`,
      method: "GET",
      description: "Get details of the created store",
    },
    {
      rel: "update-store",
      href: `${host}/seller/store/${store.storeURI}`,
      method: "PUT",
      description: "Update this store",
    },
    {
      rel: "delete-store",
      href: `${host}/seller/stores/${store.storeURI}`,
      method: "DELETE",
      description: "Delete this store",
    },
  ];

  // Return a JSON response with the created store and HATEOAS links
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { content: store, links },
        "Store created successfully"
      )
    );
});

module.exports = createStore;
