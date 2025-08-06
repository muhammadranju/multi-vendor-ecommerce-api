const Products = require("../../../../../models/Products.model/Products.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const productsStarts = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  // if all data is valid then create a new Object model for database
  const products = await Products.find();
  if (!products.length) {
    throw new ApiError(404, "No products found.");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/products/`,
      method: "GET",
      description: "Retrieve the created products",
    },
    {
      rel: "update_product",
      href: `${host}/users/products/${products._id}`,
      method: "PUT",
      description: "Update the created products",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { products, links }, "Product created successfully.")
    );
});

module.exports = productsStarts;
