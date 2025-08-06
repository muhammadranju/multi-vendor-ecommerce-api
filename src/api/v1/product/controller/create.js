const Product = require("../../../../models/Products.model/Products.model");
const Store = require("../../../../models/Store.model/Store.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

/**
 * Asynchronously creates a new product in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} The JSON response containing the created product.
 */

const productCreateController = asyncHandler(async (req, res) => {
  const {
    store_Id,
    title,
    description,
    short_description,
    regular_price,
    weight,
    stock_quantity,
    tags,
    cover_image,
    images,
    attributes,
    dimensions,
    category_Id,
    brand_Id,
  } = req.body;

  validateFieldsCheck(req.body, [
    "store_Id",
    "title",
    "description",
    "short_description",
    "regular_price",
    "weight",
    "stock_quantity",
    "tags",
    "cover_image",
    "images",
    "attributes",
    "dimensions",
    "category_Id",
    "brand_Id",
  ]);

  // Find the seller and store in the database
  const store = await Promise.all([Store.findById(store_Id)]);

  // check seller and store is exists or not

  if (!store) {
    throw new ApiError(404, "Shop not found");
  }

  // Create a new product object using the data from the request body
  const product = new Product({
    title,
    description,
    short_description,
    regular_price,
    weight,
    stock_quantity,
    tags,
    cover_image,
    images,
    attributes,
    dimensions,
    category_Id,
    brand_Id,
    store_Id,
  });

  // Save the product to the database
  await product.save();

  const host = req.apiHost;

  const links = [
    {
      rel: "self",
      href: `${host}/products/${product?.slug}`,
      method: "GET",
    },
    {
      rel: "create",
      href: `${host}/products`,
      method: "POST",
    },
    {
      rel: "update",
      href: `${host}/products/${product?.slug}`,
      method: "PUT",
    },
    {
      rel: "delete",
      href: `${host}/products/${product?.slug}`,
      method: "DELETE",
    },
    {
      rel: "all-products",
      href: `${host}/products`,
      method: "GET",
    },
  ];

  // Return the response with the created product and relevant links
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        product,
        links,
      },
      "Product created successfully"
    )
  );
});

module.exports = productCreateController;
