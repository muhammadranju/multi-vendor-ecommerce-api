const Comment = require("../../../../models/Comment.model/Comment.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const commentCreateController = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  let { content, product, rating } = req.body;
  const userId = req.user?.userId;

  // check data is valid or not
  validateFieldsCheck(req.body, ["content", "product", "rating"]);

  // convert rating and serviceRating to number
  rating = Number(rating);

  // if all data is valid then create a new Object model for database
  const comment = new Comment({
    content,
    product,
    rating,
    userId,
  });

  console.log(comment);

  await comment.save();

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/comments/`,
      method: "GET",
      description: "Retrieve the created comments",
    },

    {
      rel: "update_comment",
      href: `${host}/users/comments/${comment._id}`,
      method: "PUT",
      description: "Update the created comments",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(201)
    .json(
      new ApiResponse(201, { comment, links }, "Comment created successfully.")
    );
}); // export the function

module.exports = commentCreateController;
