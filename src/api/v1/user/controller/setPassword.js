const { AvailableSocialLogins } = require("../../../../constants");
const User = require("../../../../models/User.model/User.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const compareBcryptPassword = require("../../../../utils/compareBcryptPassword");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const setPasswordController = asyncHandler(async (req, res) => {
  // check user email reset link is expired or not
  // if user email reset link is expired return "Your email reset link is expired."
  // get password from frontend or req.body (newPassword, newPasswordTow)
  // get all password in from frontend or req.body
  const { password } = req.body;

  validateFieldsCheck(req.body, ["password"]);

  // find user on database by userId
  const user = await User.findById({ _id: req.user.userId });

  // check user password and database password is match or not
  const isMatch = await compareBcryptPassword(password, user.password);
  console.log(isMatch);

  // save to old password to new password
  user.password = password;
  user.provider.push(AvailableSocialLogins.LOCAL);
  await user.save(); // save to database

  const host = req.apiHost;
  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${host}/users/set-password`,
      method: "POST",
      description: "Set Password",
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
        "Password was set successfully."
      )
    );
});

module.exports = setPasswordController;
