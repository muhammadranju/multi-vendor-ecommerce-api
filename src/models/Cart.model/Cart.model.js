const { Schema, model } = require("mongoose");
const { ModelRefNames } = require("../../constants");
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRefNames.User, // Reference to the User model
      index: true, // Create an index for efficient querying by user
    },
    // items: {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRefNames.Product, // Reference to the Product model
      index: true, // Create an index for efficient product lookup
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Enforce minimum quantity of 1
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    active: {
      // Track whether the cart is currently in use
      type: Boolean,
      default: true,
    },
    // Additional fields as needed (e.g., coupons, discounts, taxes, shipping options)
  },
  { timestamps: true }
);

// Virtual field for total bill amount
cartSchema.virtual("totalBill").get(function () {
  return this.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

// Set timestamps for automatic updates
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = model(ModelRefNames.Cart, cartSchema);
module.exports = Cart;
