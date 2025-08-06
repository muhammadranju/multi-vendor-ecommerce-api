const { Schema, model } = require("mongoose");
const { ModelRefNames } = require("../../constants");
const { default: slugify } = require("slugify");

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    socialMedia: {
      type: {
        _id: false,
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
        // ... Add other platforms as needed
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

BrandSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    this.slug = `${slugify(this.name, { lower: true })}`;
  }
  next();
});

const Brand = model(ModelRefNames.Brand, BrandSchema);
module.exports = Brand;
