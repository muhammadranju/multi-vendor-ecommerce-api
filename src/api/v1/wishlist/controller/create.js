const Wishlist = require("../../../../models/Wishlist.model/Wishlist.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

// Controller function to handle creation of a wishlist item
const createWishlistController = asyncHandler(async (req, res) => {
  // Extract productId and userId from request body or user object
  const { productId } = req.body;
  const userId = req.user.userId || req.body.userId;

  // Check if productId or userId is missing
  validateFieldsCheck(req.body, ["productId"]);

  // Find existing wishlist for the user
  const existingWishlist = await Wishlist.findOne({
    user: userId,
    products: productId,
  });

  // Check if the item already exists in the user's wishlist
  if (existingWishlist) {
    throw new ApiError(400, "Item already exists in wishlist");
  }

  // Create a new wishlist with the product
  const wishlist = new Wishlist({ user: userId, products: productId });

  // Save the updated wishlist
  await wishlist.save();

  const host = req.apiHost;
  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${host}/wishlists`,
      method: "GET",
      description: "Get details of the created wishlist item",
    },
    {
      rel: "delete",
      href: `${host}/wishlists`,
      method: "DELETE",
      description: "Remove item from wishlist",
    },
    {
      rel: "user-profile",
      href: `${host}/users/profile`,
      method: "GET",
      description: "View user profile",
    },
    {
      rel: "product-details",
      href: `${host}/products/${productId}`,
      method: "GET",
      description: "View details of the product added to wishlist",
    },
  ];

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { wishlist, links },
        "Item added to wishlist successfully"
      )
    );
});

module.exports = createWishlistController;
