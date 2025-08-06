const AdminUser = require("../models/AdminUser/AdminUser");
const Seller = require("../models/Seller.model/Seller.model");
const User = require("../models/User.model/User.model");
const ApiError = require("../utils/ApiError");

const checkPermission = ({ permission, abacCheck = null }) => {
  return async (req, res, next) => {
    let user;

    if (req.user.role === "seller") {
      user = await Seller.findById(req.user.userId).populate({
        path: "role",
        populate: { path: "permissions" },
      });
    } else if (req.user.role === "customer") {
      user = await User.findById(req.user.userId).populate({
        path: "role",
        populate: { path: "permissions" },
      });
    } else {
      user = await AdminUser.findById(req.user.userId).populate({
        path: "role",
        populate: { path: "permissions" },
      });
    }
    // user = await User.findById(req.user.userId)
    //   // .populate("permissions")
    //   .populate({
    //     path: "role",
    //     populate: { path: "permissions" },
    //   });

    const rolePermissions = user.role?.permissions || [];
    const userPermissions = user.permissions || [];

    // console.log("role only", rolePermissions);
    // console.log("user role only", userPermissions);

    const allPermissions = new Set([
      ...rolePermissions.map((p) => p.name),
      ...userPermissions.map((p) => p.name),
    ]);

    // console.log("permission", permission);

    // console.log("all permissions", allPermissions);
    // RBAC check
    if (!allPermissions.has(permission)) {
      throw new ApiError(403, "Access denied (RBAC)");
    }

    // ABAC check (optional)
    // if (abacCheck && !(await abacCheck(user, req))) {
    //   throw new ApiError(403, "Access denied (ABAC)");
    // }

    if (abacCheck) {
      for (const [key, value] of Object.entries(abacCheck)) {
        if (user[key] !== value) {
          throw new ApiError(
            403,
            `Access denied: failed ABAC condition on ${key}`
          );
        }
      }
    }

    // Pass user forward with permissions if needed
    // req.user = user;
    next();
  };
};

module.exports = checkPermission;
