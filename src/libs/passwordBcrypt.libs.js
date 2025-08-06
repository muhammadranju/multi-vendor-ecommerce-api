const bcrypt = require("bcryptjs");

const comparePassword = async function (password, storedPassword) {
  return await bcrypt.compare(password, storedPassword);
};

const hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(11);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  comparePassword,
  hashPassword,
};
