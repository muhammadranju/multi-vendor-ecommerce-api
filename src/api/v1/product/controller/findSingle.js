const Product = require("../../../../models/Products.model/Products.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

/**
 * Handles the HTTP request for finding a single product by its id or SKU.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the request has been handled.
 * @throws {ApiError} - Throws an ApiError with a 400 status code if the productId is not provided.
 * @throws {ApiError} - Throws an ApiError with a 404 status code if the product is not found.
 */
const findSingle = asyncHandler(async (req, res) => {
  // Get the productId from the request parameters
  const { productId } = req.params;

  // Check if the productId is provided
  if (!productId) {
    throw new ApiError(400, "productId is required");
  }

  /** ------------------------------------------------------------
   * Build an aggregation pipeline instead of a simple findOne().
   * ---------------------------------------------------------- */
  const pipeline = [
    // 1️ match by slug OR SKU
    {
      $match: {
        $or: [{ slug: productId }, { SKU: productId }],
      },
    },

    // 2️ Store information
    {
      $lookup: {
        from: "stores", // collection name **exactly** as in MongoDB
        localField: "store_Id", // field in Product doc
        foreignField: "_id",
        as: "store",
      },
    },
    { $unwind: { path: "$store", preserveNullAndEmptyArrays: true } },

    // 3️ Category information
    {
      $lookup: {
        from: "categories",
        localField: "category_Id",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

    // 4️ Brand information
    {
      $lookup: {
        from: "brands",
        localField: "brand_Id",
        foreignField: "_id",
        as: "brand",
      },
    },
    { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },

    // 5 Comments information
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "product",
        as: "comments",
      },
    },
    // { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
    // 6 Trim the object down to just what the client needs
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        SKU: 1,
        price: 1,
        description: 1,
        short_description: 1,
        regular_price: 1,
        discount_price: 1,
        total_sales: 1,
        weight: 1,
        dimensions: 1,
        attributes: 1,
        average_rating: 1,
        cover_image: 1,
        images: 1,
        stock_quantity: 1,
        stock_status: 1,
        tags: 1,
        product_status: 1,
        store: { _id: 1, storeName: 1, storeURI: 1 },
        category: { _id: 1, name: 1, category_url: 1 },
        brand: { _id: 1, name: 1, slug: 1 },
        default_attributes: 1,
        comments: 1,
      },
    },
  ];

  const [product] = await Product.aggregate(pipeline);

  // Check if the product is found in the database
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/products/${productId}`,
      method: "GET",
    },
    {
      rel: "create",
      href: `${host}/products`,
      method: "POST",
    },
    {
      rel: "update",
      href: `${host}/products/${productId}`,
      method: "PUT",
    },
    {
      rel: "delete",
      href: `${host}/products/${productId}`,
      method: "DELETE",
    },
    {
      rel: "list",
      href: `${host}/products`,
      method: "GET",
    },
  ];

  // Return the product as a JSON response with a 200 status code (OK) and a success message
  return res.json(new ApiResponse(200, { product, links }, "Product found"));
});

module.exports = findSingle;
