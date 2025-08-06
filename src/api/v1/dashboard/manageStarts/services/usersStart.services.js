const ApiError = require("../../../../../utils/ApiError");
const User = require("../../../../../models/User.model/User.model");

const usersStartServices = async () => {
  // get all data from req,body or frontend (content, author, product, rating)

  // if all data is valid then create a new Object model for database
  const users = await User.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "userId",
        as: "comments",
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "userId",
        as: "reviews",
      },
    },
    { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "userId",
        as: "orders",
      },
    },
    {
      $unwind: {
        path: "$orders",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "payments",
        localField: "_id",
        foreignField: "userId",
        as: "payments",
      },
    },
    { $unwind: { path: "$payments", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "carts",
        localField: "_id",
        foreignField: "userId",
        as: "carts",
      },
    },
    { $unwind: { path: "$carts", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "wishlists",
        localField: "_id",
        foreignField: "userId",
        as: "wishlists",
      },
    },

    { $unwind: { path: "$wishlists", preserveNullAndEmptyArrays: true } },
  ]);
  if (!users.length) {
    throw new ApiError(404, "No users found.");
  }
  console.log(users);

  return users;
};

module.exports = usersStartServices;
