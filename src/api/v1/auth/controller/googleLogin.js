const Role = require("../../../../models/Role.model/Role.model");
const asyncHandler = require("../../../../utils/asyncHandler");
const options = require("../../../../utils/cookieOptions");
const generateUserTokens = require("../../../../utils/userTokens");

const googleLoginController = asyncHandler(async (req, res) => {
  const user = req.user;

  let stateQuery = req.query.state ? req.query.state : "";
  if (stateQuery.startsWith("/")) {
    stateQuery = stateQuery.slice(1);
  }

  const role = await Role.findById(user.role);

  console.log("this from google", req.user);
  const { accessToken, refreshToken } = generateUserTokens(req.user, role);
  res.cookie("refreshToken", refreshToken, options);
  res.cookie("accessToken", accessToken, options);

  return res.redirect(`http://localhost:5173/${stateQuery}`);
});

module.exports = googleLoginController;
