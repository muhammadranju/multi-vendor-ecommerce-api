const config = require("../config/config");
const { generateToken } = require("../libs/jwt.libs");

const generateUserTokens = function (user, role) {
  // console.log(user);
  const payload = {
    user_id: user?._id,
    email: user?.email,
    name: user?.name,
    role: role?.name,
    status: user?.status,
  };
  const accessToken = generateToken(
    payload,
    config.ACCESS_TOKEN_SECRET,
    config.ACCESS_TOKEN_EXPIRY
  );

  const refreshToken = generateToken(
    payload,
    config.REFRESH_TOKEN_SECRET,
    config.REFRESH_TOKEN_EXPIRY
  );

  return { accessToken, refreshToken };
};

module.exports = generateUserTokens;
