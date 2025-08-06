const Comment = require("../../../../models/Comment.model/Comment.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const commentUpdateController = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  // get all data from req,body or frontend (content, author, product, rating)
  let { content, rating } = req.body;
  // Extract user ID from the request object
  const userId = req.user?.userId;

  // Convert rating and serviceRating to numbers
  rating = Number(rating);

  // Find the comment by ID
  const comment = await Comment.findOne({ _id: commentId, userId });

  console.log(comment);
  // Check if the comment exists
  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  // Validate that ratings are between 1 and 5
  if (rating > 5 || rating < 1) {
    throw new ApiError(400, "Rating must be between 1 and 5.");
  }

  // Update the comment fields
  comment.content = content ?? comment.content;
  comment.rating = rating ?? comment.rating;

  // Save the updated comment to the database
  console.log(comment);
  await comment.save();

  const host = req.apiHost;

  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${host}/users/comments/`,
      method: "GET",
      description: "Get details of the updated comment",
    },
    {
      rel: "update-comment",
      href: `${host}/comments/update/`,
      method: "PUT",
      description: "Update this comment",
    },
  ];

  // Return a success response with the updated comment
  return res
    .status(200)
    .json(
      new ApiResponse(200, { comment, links }, "Comment updated successfully")
    );
});

// Export the controller to be used in other parts of the application
module.exports = commentUpdateController;
