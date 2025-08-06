const Wishlist = require("../../../../models/Wishlist.model/Wishlist.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const deleteWishlistController = asyncHandler(async (req, res) => {
  // Destructure userId and productId for clarity
  const { userId } = req.user;
  const productId = req.body.productId;

  // Validate input (optional, but recommended)
  // Check if productId or userId is missing
  validateFieldsCheck(req.body, ["productId"]);

  // Find the wishlist using userId
  const wishlist = await Wishlist.findOne({
    user: userId,
    products: productId,
  });

  // Check if wishlist exists and throw an error if not
  if (!wishlist) {
    throw new ApiError(404, "Wishlist not found");
  }

  // Remove the product from the wishlist
  await wishlist.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Item removed from wishlist"));
});

module.exports = deleteWishlistController;
