const jwt = require("jsonwebtoken");

const generateToken = function (payload, TOKEN_SECRET, TOKEN_EXPIRY) {
  return jwt.sign(
    {
      ...payload,
    },
    TOKEN_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};

const verifyToken = function (token, TOKEN_SECRET) {
  return jwt.verify(token, TOKEN_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
