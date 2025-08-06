const { Schema, model } = require("mongoose");
const { ModelRefNames } = require("../../constants");
const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRefNames.User, // Replace 'User' with your User model name
    },
    products: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRefNames.Product, // Replace 'Product' with your Product model name
      sparse: true, // Exclude empty product references (optional)
    },
  },
  { timestamps: true }
);

wishlistSchema.pre("save", async function (next) {
  // Optional: Handle nested validation or custom logic here
  next();
});

const Wishlist = model(ModelRefNames.Wishlist, wishlistSchema);
module.exports = Wishlist;
