const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");
const usersStartServices = require("../services/usersStart.services");

const usersStarts = asyncHandler(async (req, res) => {
  const users = await usersStartServices();
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/users/`,
      method: "GET",
      description: "Retrieve the created users",
    },
    {
      rel: "update_user",
      href: `${host}/users/users/${users._id}`,
      method: "PUT",
      description: "Update the created users",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(new ApiResponse(200, { users, links }, "User created successfully."));
});

module.exports = usersStarts;
