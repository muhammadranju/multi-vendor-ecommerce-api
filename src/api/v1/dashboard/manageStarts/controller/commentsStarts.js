const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");
const commentsStartsServices = require("../services/commentsStarts.services");

const commentsStarts = asyncHandler(async (req, res) => {
  const comments = await commentsStartsServices();

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
      href: `${host}/users/comments/${comments._id}`,
      method: "PUT",
      description: "Update the created comments",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { comments, links }, "Comment created successfully.")
    );
});

module.exports = commentsStarts;
