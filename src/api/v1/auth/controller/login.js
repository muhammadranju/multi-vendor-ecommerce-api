const { ApiVersion } = require("../../../../constants");
const Role = require("../../../../models/Role.model/Role.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const options = require("../../../../utils/cookieOptions");
const generateUserTokens = require("../../../../utils/userTokens");

const loginController = asyncHandler(async (req, res) => {
  const user = req.user;

  const role = await Role.findById(user.role);

  const { accessToken, refreshToken } = generateUserTokens(user, role);
  const links = [
    {
      rel: "self",
      href: `${req.myHost}${ApiVersion}/auth/login`, // Example URL for login
      method: "POST",
    },
    {
      rel: "account",
      href: `${req.myHost}${ApiVersion}/users/account`, // Example URL for updating user profile
      method: "PATCH",
    },
    {
      rel: "logout",
      href: `${req.myHost}${ApiVersion}/auth/logout`, // Example URL for logging out
      method: "POST",
    },
  ];

  res.cookie("refreshToken", refreshToken, options);
  res.cookie("accessToken", accessToken, options);
  // eslint-disable-next-line no-unused-vars
  const { password: pass, ...data } = user.toObject();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken, user: data, links },
        "User login to account successfully."
      )
    );
});

module.exports = loginController;
