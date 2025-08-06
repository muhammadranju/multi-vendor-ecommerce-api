const createRole = require("./create");
const deleteRole = require("./delete");
const findAllRoles = require("./findAll");
const updateRole = require("./update");
const { assignRolesToUser, getUserRoles } = require("./assignRole");
const removeRole = require("./removeRole");

module.exports = {
  createRole,
  deleteRole,
  findAllRoles,
  updateRole,
  assignRolesToUser,
  getUserRoles,
  removeRole,
};
