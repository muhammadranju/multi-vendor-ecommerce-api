const ApiVersion = "/api/v1";
const baseURI = `http://localhost:3030${ApiVersion}`;

/**
 * @type {{ ADMIN:"ADMIN", USER:"USER", EDITOR:"EDITOR", MANAGER:"MANAGER" SELLER:"SELLER"} as const}
 */

// User Enums
const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
  EDITOR: "EDITOR",
  MANAGER: "MANAGER",
  SELLER: "SELLER",
};

// const AvailableUserRoles = Object.values(UserRolesEnum);

const ROLES = {
  CUSTOMER: "customer",
  SELLER: "seller",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  MANAGER: "manager",
  CUSTOMER_SUPPORT: "customer_support",
  SALES_MANAGER: "sales_manager",
  DELIVERY_STAFF: "delivery_staff",
  USER_MANAGER: "user_manager",
};

const AvailableUserRoles = Object.values(ROLES);

/**
 * @type {{ ACTIVE:"ACTIVE", INACTIVE:"INACTIVE", SUSPENDED:"SUSPENDED", BLOCKED:"BLOCKED", DELETED:"DELETED" } as const}
 */
const UserStatusEnum = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED",
};

/**
 * @type {{  COSTUMER:"682c27c4e1254af2d36017fb", SELLER:"682c27b9e1254af2d36017f2"} as const}
 */
const RolesId = {
  COSTUMER: "682c27c4e1254af2d36017fb",
  SELLER: "682c27b9e1254af2d36017f2",
};

const AvailableUserStatus = Object.values(UserStatusEnum);

/**
 * @type {{ APPROVED:"APPROVED", PENDING:"PENDING", SUSPENDED:"SUSPENDED"} as const}
 */
const UserCommentStatusEnum = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  SUSPENDED: "SUSPENDED",
};
const AvailableCommentStatus = Object.values(UserCommentStatusEnum);

/**
 * @type {{ PENDING: "PENDING"; CANCELLED: "CANCELLED"; DELIVERED: "DELIVERED"; PLACED: "PLACED"; OUT_FOR_DELIVERY: "PROCESSING"; SHIPPED: "SHIPPED"; } as const}
 */

// Order Enums
const OrderStatusEnum = {
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
  PLACED: "PLACED",
  OUT_FOR_DELIVERY: "PROCESSING",
  SHIPPED: "SHIPPED",
};
const AvailableOrderStatuses = Object.values(OrderStatusEnum);

/**
 * @type {{ SUCCEEDED: "SUCCEEDED"; UNPAID: "UNPAID"; CANCELLED: "CANCELLED"; FAILED: "FAILED"; REFUNDED: "REFUNDED";STATUS: "VALID"; APIConnect: "DONE"  } as const}
 */

const PaymentStatus = {
  SUCCEEDED: "SUCCEEDED",
  UNPAID: "UNPAID",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  STATUS: "VALID",
  APIConnect: "DONE",
};
const AvailablePaymentStatus = Object.values(PaymentStatus);

/**
 * @type {{ CREDIT_CARD: "CREDIT_CARD"; DEBIT_CARD: "DEBIT_CARD"; INTERNET_BANKING: "INTERNET_BANKING"; MOBILE_BANKING: "MOBILE_BANKING"; WALLET: "WALLET"; CASH_ON_DELIVERY: "CASH_ON_DELIVERY"; } as const}
 */
const PaymentMethods = {
  CREDIT_CARD: "CREDIT_CARD",
  DEBIT_CARD: "DEBIT_CARD",
  MOBILE_BANKING: "MOBILE_BANKING",
  INTERNET_BANKING: "INTERNET_BANKING",
  WALLET: "WALLET",
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
};
const AvailablePaymentMethods = Object.values(PaymentMethods);

/**
 * @type {{ PENDING:"PENDING", PUBLISHED:"PUBLISHED", DRAFT:"DRAFT" } as const}
 */
// Post Enums
const PostStatusEnum = {
  PENDING: "PENDING",
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
};
const AvailablePostStatus = Object.values(PostStatusEnum);

/**
 * @type {{ GOOGLE: "GOOGLE"; FACEBOOK: "FACEBOOK"; APPLE: "APPLE"; LOCAL: "LOCAL"} as const}
 */
const UserLoginType = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
  APPLE: "APPLE",
  LOCAL: "LOCAL",
};
const AvailableSocialLogins = Object.values(UserLoginType);

/**
 * @type {{ User:"User"; Product:"Product"; Reviews:"Reviews"; Order:"Order"; Seller:"Seller";  Store: "Store"; Payment:"Payment"; Category:"Category"; Cart:"Cart"; Wishlist:"Wishlist"; Brand:"Brand"; Address:"Address"; OrdersItem:"OrdersItem"; Role:"Role";} as const}
 */
// Model References
const ModelRefNames = {
  User: "User",
  Product: "Product",
  Reviews: "Reviews",
  Order: "Order",
  Seller: "Seller",
  Store: "Store",
  Payment: "Payment",
  Category: "Category",
  Cart: "Cart",
  Wishlist: "Wishlist",
  Brand: "Brand",
  Address: "Address",
  OrdersItem: "OrdersItem",
  Role: "Role",
  Comment: "Comment",
};

/**
 * @type {{ VERIFY:true, UNVERIFIED:false, } as const}
 */
const VerifyStatus = {
  VERIFY: true,
  UNVERIFIED: false,
};

const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};

const PERMISSIONS = {
  // Product
  CREATE_PRODUCT: "create_product",
  EDIT_PRODUCT: "edit_product",
  DELETE_PRODUCT: "delete_product",

  // Order
  VIEW_ORDERS: "view_orders",
  MANAGE_USERS: "manage_users",
  VIEW_PRODUCTS: "view_products",

  // Admin management of categories
  MANAGE_CATEGORIES: "manage_categories",
  PROCESS_ORDERS: "process_orders",
  CANCEL_ORDERS: "cancel_orders",
  MANAGE_DISCOUNTS: "manage_discounts",
  VIEW_SALES_REPORTS: "view_sales_reports",

  // Settings
  MANAGE_SETTINGS: "manage_settings",

  // Ticket
  CREATE_TICKET: "create_ticket",
  RESPOND_TICKET: "respond_ticket",

  // Order
  UPDATE_DELIVERY_STATUS: "update_delivery_status",
  TRACK_ORDER: "track_order",

  // Auth
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout",
  EDIT_PROFILE: "edit_profile",

  // Seller
  CREATE_SELLER: "create_seller",
  UPDATE_SELLER: "update_seller",
  CREATE_STORE: "create_store",
  EDIT_STORE: "edit_store",
  DELETE_STORE: "delete_store",

  // Category
  CREATE_CATEGORY: "create_category",
  UPDATE_CATEGORY: "update_categories",
  DELETE_CATEGORY: "delete_categories",
  VIEW_CATEGORY: "view_category",

  // Brand
  VIEW_BRAND: "view_brand",
  CREATE_BRAND: "create_brand",
  UPDATE_BRAND: "update_brand",
  DELETE_BRAND: "delete_brand",

  // Permissions
  CREATE_PERMISSIONS: "create_permissions",
  DELETE_PERMISSIONS: "delete_permissions",
  VIEW_PERMISSIONS: "view_permissions",
  UPDATE_PERMISSIONS: "update_permissions",

  // Roles
  ASSIGN_ROLES: "assign_roles",
  CREATE_ROLES: "create_roles",
  UPDATE_ROLES: "update_roles",
  DELETE_ROLES: "delete_roles",
  VIEW_ROLES: "view_roles",

  // Categories
  CREATE_CATEGORIES: "create_categories",
  UPDATE_CATEGORIES: "update_categories",
  DELETE_CATEGORIES: "delete_categories",

  //  Reviews
  CREATE_REVIEWS: "create_reviews",
  UPDATE_REVIEWS: "update_reviews",
  DELETE_REVIEWS: "delete_reviews",
  VIEW_REVIEWS: "view_reviews",

  // Comment
  CREATE_COMMENT: "create_comment",
  UPDATE_COMMENT: "update_comment",
  DELETE_COMMENT: "delete_comment",
  VIEW_COMMENT: "view_comment",

  // Starts
  VIEW_STARTS_ORDERS: "view_starts_orders",
  VIEW_STARTS_PAYMENTS: "view_starts_payments",
  VIEW_STARTS_USERS: "view_starts_users",
  VIEW_STARTS_REVIEWS: "view_starts_reviews",
  VIEW_STARTS_COMMENTS: "view_starts_comments",
  VIEW_STARTS_PRODUCTS: "view_starts_products",
};

// Constants database stuff
const DATABASE_NAME = "multi-vendor-e-commerce";
const DATABASE_QUERY = "?retryWrites=true&w=majority";

module.exports = {
  UserRolesEnum,
  RolesId,
  AvailableUserRoles,
  UserStatusEnum,
  AvailableUserStatus,
  UserCommentStatusEnum,
  AvailableCommentStatus,
  PostStatusEnum,
  AvailablePostStatus,
  ModelRefNames,
  AvailableSocialLogins,
  UserLoginType,
  VerifyStatus,
  DATABASE_NAME,
  DATABASE_QUERY,
  ApiVersion,
  Gender,
  AvailableOrderStatuses,
  OrderStatusEnum,
  AvailablePaymentMethods,
  PaymentMethods,
  AvailablePaymentStatus,
  PaymentStatus,
  baseURI,
  ROLES,
  PERMISSIONS,
};
