const Comment = require("../../../../models/Comment.model/Comment.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const findAllCommentController = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  const userId = req.user?.userId;

  // if all data is valid then create a new Object model for database
  const comment = await Comment.find({ userId });
  if (!comment.length) {
    throw new ApiError(404, "No comment found.");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/products/comment`,
      method: "GET",
      description: "Retrieve the created comment",
    },

    {
      rel: "update_review",
      href: `${host}/products/comment/${comment._id}`,
      method: "PUT",
      description: "Update the created comment",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { comment, links }, "Comment created successfully.")
    );
});

module.exports = findAllCommentController;
