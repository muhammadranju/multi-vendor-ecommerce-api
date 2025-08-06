const mongoose = require("mongoose");
const Wishlist = require("../../../../models/Wishlist.model/Wishlist.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const getWishlistsController = asyncHandler(async (req, res) => {
  const userId = req.user?.userId || req.params?.userId;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const wishlistProducts = await Wishlist.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      },
    },
    { $unwind: "$products" },
    {
      $project: {
        _id: 0,
        user: "$user",
        product: {
          _id: "$products._id",
          title: "$products.title",
          product_uid: "$products.product_uid",
          short_description: "$products.short_description",
          regular_price: "$products.regular_price",
          cover_image: "$products.cover_image",
        },
      },
    },
    {
      $group: {
        _id: "$user",
        wishlists: { $push: "$product" },
      },
    },
    {
      $project: {
        _id: 0,
        user: "$_id",
        wishlists: 1,
      },
    },
  ]);

  if (!wishlistProducts.length) {
    throw new ApiError(404, "No wishlist found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, wishlistProducts[0], "Wishlist fetched successfully")
    );
});

module.exports = getWishlistsController;
