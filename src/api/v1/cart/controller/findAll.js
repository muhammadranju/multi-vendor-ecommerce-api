const mongoose = require("mongoose");
const Cart = require("../../../../models/Cart.model/Cart.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const findAddToCartController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  // Aggregate cart items with product info and totals
  const cartData = await Cart.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        _id: 0,
        user: "$user",
        productId: 1,
        quantity: 1,
        totalPrice: 1,
        "productDetails.name": 1,
        "productDetails.slug": 1,
        "productDetails.cover_image": 1,
        "productDetails.short_description": 1,
        "productDetails.regular_price": 1,
      },
    },
    {
      $group: {
        _id: "$user",
        carts: { $push: "$productDetails" },
      },
    },
    {
      $project: {
        _id: 0,
        user: "$_id",
        carts: 1,
      },
    },
  ]);

  if (!cartData.length) {
    throw new ApiError(404, "Cart not found for this user");
  }

  const carts = cartData[0].carts;

  // HATEOAS Links
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/carts`,
      method: "GET",
      description: "View your cart",
    },
    {
      rel: "add_to_cart",
      href: `${host}/carts`,
      method: "POST",
      description: "Add item to cart",
    },
    {
      rel: "empty_cart",
      href: `${host}/carts/empty`,
      method: "DELETE",
      description: "Empty the cart",
    },
    {
      rel: "remove_item",
      href: `${host}/carts/:itemId`,
      method: "DELETE",
      description: "Remove an item from the cart",
    },
  ];

  return res
    .status(200)
    .json(new ApiResponse(200, { carts, links }, "Cart fetched successfully"));
});

module.exports = findAddToCartController;
