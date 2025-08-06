const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const compareBcryptPassword = require("../../../../utils/compareBcryptPassword");

const changePasswordController = asyncHandler(async (req, res) => {
  // check user email reset link is expired or not
  // if user email reset link is expired return "Your email reset link is expired."
  // get password from frontend or req.body (newPassword, newPasswordTow)
  // get all password in from frontend or req.body
  const { oldPassword, newPassword, conformPassword } = req.body;

  if ((!oldPassword, !newPassword, !conformPassword)) {
    throw new ApiError(
      400,
      "You must be provide New password and Conform password"
    );
  }
  // check newPassword and conformPassword is match or not
  if (newPassword !== conformPassword) {
    throw new ApiError(400, "Password or Conform Password don't match.");
  }

  // console.log("change password", req.user);
  // find user on database by userId
  const user = await User.findById({ _id: req.user.userId });

  // check user password and database password is match or not
  const isMatch = await compareBcryptPassword(oldPassword, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new ApiError(400, "Password don't match.");
  }

  // save to old password to new password
  user.password = newPassword;
  await user.save(); // save to database

  const host = req.apiHost;
  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${host}/users/change-password`,
      method: "POST",
      description: "Change Password",
    },
    {
      rel: "profile",
      href: `${host}/users/profile}`,
      method: "GET",
      description: "View Profile",
    },
    {
      rel: "logout",
      href: `${host}/users/logout`,
      method: "POST",
      description: "Logout",
    },
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(
        203,
        { yourEmail: user.email, links },
        "Password was change successfully."
      )
    );
});

module.exports = changePasswordController;
