const Comments = require("../../../../../models/Comment.model/Comment.model");
const ApiError = require("../../../../../utils/ApiError");
const commentsStartsServices = async () => {
  // get all data from req,body or frontend (content, author, product, rating)

  // if all data is valid then create a new Object model for database
  const comments = await Comments.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    {
      $project: {
        _id: 1,

        product: { _id: 1, title: 1, slug: 1 },
        user: { _id: 1, name: 1, email: 1 },
        content: 1,
        rating: 1,
        comment: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!comments.length) {
    throw new ApiError(404, "No comments found.");
  }

  console.log(comments);

  return comments;
};

module.exports = commentsStartsServices;
