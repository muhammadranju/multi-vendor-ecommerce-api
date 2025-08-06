const mongoose = require("mongoose");
const Cart = require("../../../../models/Cart.model/Cart.model");
const Product = require("../../../../models/Products.model/Products.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const createAddTOCartController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity = 1 } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid or missing productId.");
  }

  // Fetch product
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // Check if the item already exists in the user's cart
  let cartItem = await Cart.findOne({ userId, productId });

  if (cartItem) {
    // Update quantity and price
    cartItem.quantity += quantity;
    cartItem.totalPrice = product.regular_price * cartItem.quantity;
    await cartItem.save();
  } else {
    // Create new cart item
    cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      totalPrice: product.regular_price * quantity,
    });
  }

  // HATEOAS links
  const links = [
    {
      rel: "view_cart",
      href: `${req.apiHost}/carts`,
      method: "GET",
      description: "View Cart",
    },
    {
      rel: "orders",
      href: `${req.apiHost}/orders`,
      method: "GET",
      description: "Orders",
    },
  ];

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(201, { cart: cartItem, links }, "Item added to cart")
    );
});

module.exports = createAddTOCartController;
