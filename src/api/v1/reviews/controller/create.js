const Reviews = require("../../../../models/Reviews.model/Reviews.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const reviewsCreateController = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  let { content, products, rating, serviceRating } = req.body;
  const userId = req.user?.userId;

  // check data is valid or not
  validateFieldsCheck(req.body, [
    "content",
    "products",
    "rating",
    "serviceRating",
  ]);

  // convert rating and serviceRating to number
  rating = Number(rating);
  serviceRating = Number(serviceRating);

  // if all data is valid then create a new Object model for database
  const reviews = new Reviews({
    content,
    products: products,
    rating,
    serviceRating,
    userId,
  });

  console.log(reviews);

  await reviews.save();

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/reviews/`,
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
      rel: "delete_review",
      href: `${host}/users/reviews/${reviews._id}`,
      method: "DELETE",
      description: "Delete the created reviews",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(201)
    .json(
      new ApiResponse(201, { reviews, links }, "Comment created successfully.")
    );
});

module.exports = reviewsCreateController;
