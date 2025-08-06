const config = require("../../../../config/config");
const { verifyToken, generateToken } = require("../../../../libs/jwt.libs");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const options = require("../../../../utils/cookieOptions");

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const tokenDe = jwt.decode(refreshToken);
  console.log(tokenDe);

  if (!refreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Refresh token is missing."));
  }

  // const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
  const decoded = verifyToken(refreshToken, config.REFRESH_TOKEN_SECRET);

  if (!decoded) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Invalid or expired refresh token."));
  }

  const payload = {
    user_id: decoded.user_id,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role,
    status: decoded.status,
  };
  // Now generate a new access token
  const accessToken = generateToken(
    payload,
    config.ACCESS_TOKEN_SECRET,
    config.ACCESS_TOKEN_EXPIRY
  );

  res.cookie("accessToken", accessToken, options);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken },
        "Access token refreshed successfully."
      )
    );
});

module.exports = refreshTokenController;
