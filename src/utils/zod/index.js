const userSchema = require("./user.zod/user.zod");
const productSchema = require("./product.zod/product.zod");
const storeSchema = require("./store.zod/store.zod");
const orderSchema = require("./order.zod/order.zod");
const paymentSchema = require("./payment.zod/payment.zod");

module.exports = {
  userSchema,
  productSchema,
  storeSchema,
  orderSchema,
  paymentSchema,
};
