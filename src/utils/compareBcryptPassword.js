const bcrypt = require("bcryptjs");
const compareBcryptPassword = async function (password, storedPassword) {
  return await bcrypt.compare(password, storedPassword);
};

module.exports = compareBcryptPassword;
