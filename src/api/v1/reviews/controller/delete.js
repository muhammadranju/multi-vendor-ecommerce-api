const Reviews = require("../../../../models/Reviews.model/Reviews.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const deleteReviewController = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  const { reviewId } = req.params;

  // if all data is valid then create a new Object model for database
  const reviews = await Reviews.findById({ _id: reviewId });

  console.log(reviews);
  await reviews.deleteOne();

  if (!reviews) {
    throw new ApiError(404, "Reviews not found.");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/reviews`,
      method: "GET",
      description: "Retrieve the created reviews",
    },
    {
      rel: "update_review",
      href: `${host}/users/reviews/${reviews._id}`,
      method: "PUT",
      description: "Update the created reviews",
    },

    {
      rel: "product_reviews",
      href: `${host}/products/${reviews.products}?reviews=true`,
      method: "GET",
      description: "Get all reviews for the product",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { reviews, links }, "Reviews deleted successfully.")
    );
}); // export the function

module.exports = deleteReviewController;
