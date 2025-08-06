const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const User = require("../models/User.model/User.model");
const AdminUser = require("../models/AdminUser/AdminUser");
const Seller = require("../models/Seller.model/Seller.model");
const { ROLES } = require("../constants");
const { verifyToken } = require("../libs/jwt.libs");

// Admin-type roles that use AdminUser model and ADMIN token secret
const adminRoles = [
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
  ROLES.MANAGER,
  ROLES.CUSTOMER_SUPPORT,
  ROLES.SALES_MANAGER,
  ROLES.DELIVERY_STAFF,
  ROLES.USER_MANAGER,
];

/**
 * Returns the correct Mongoose model based on role
 */
const getModelForRole = (role) => {
  if (role === "customer") return User;
  if (role === "seller") return Seller;
  if (adminRoles.includes(role)) return AdminUser;
  throw new ApiError(401, `Unauthorized: Unknown role "${role}"`);
};

/**
 * Role-based authentication middleware
 * @param  {...string} allowedRoles - roles allowed to access the route
 */
const authMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers?.authorization || req.cookies.accessToken;
      const token =
        authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1]
          ? authHeader.split(" ")[1]
          : req.cookies?.accessToken;

      if (!token) {
        throw new ApiError(401, "Unauthorized: No token provided");
      }

      // Temporarily decode to find out role
      const unverifiedToken = jwt.decode(token);
      if (
        !unverifiedToken ||
        !unverifiedToken.role ||
        !unverifiedToken.user_id
      ) {
        throw new ApiError(401, "Unauthorized: Invalid token format");
      }

      // Now verify securely
      const decodedToken = verifyToken(token, config.ACCESS_TOKEN_SECRET);

      if (!allowedRoles.includes(decodedToken.role)) {
        throw new ApiError(
          403,
          `Forbidden: Role "${decodedToken.role}" not allowed`
        );
      }

      const userId = decodedToken.user_id;
      const Model = getModelForRole(decodedToken.role);
      const user = await Model.findById(userId);

      if (!user) {
        throw new ApiError(401, "Unauthorized: User not found");
      }

      // Attach full user info to req.user
      req.user = {
        userId: user._id,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        role: decodedToken.role,
        gender: user?.gender,
        avatar: user?.avatar,
        preferredCurrency: user?.preferredCurrency,
        preferredLanguage: user?.preferredLanguage,
        newsletterSubscription: user?.newsletterSubscription,
        marketingOptIn: user?.marketingOptIn,
        provider: user?.provider,
        providerId: user?.providerId,
        phoneNumber: user?.phoneNumber,
        isEmailVerified: user?.isEmailVerified,
        status: user?.status,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { authMiddleware };
