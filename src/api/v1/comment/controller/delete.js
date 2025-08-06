const Comment = require("../../../../models/Comment.model/Comment.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const commentDeleteController = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  const { commentId } = req.params;
  // if all data is valid then create a new Object model for database
  const comment = await Comment.findOne({
    _id: commentId,
    userId: req.user?.userId,
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  console.log(comment);
  await comment.deleteOne();

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
    .status(200)
    .json(
      new ApiResponse(200, { comment, links }, "Comment deleted successfully.")
    );
}); // export the function

module.exports = commentDeleteController;
