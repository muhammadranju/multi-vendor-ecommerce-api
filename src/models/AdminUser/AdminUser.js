const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const {
  hashPassword,
  // comparePassword,
} = require("../../libs/passwordBcrypt.libs");

const AdminUserSchema = new Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
      required: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }, // Hashed
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    }, // RBAC
    department: {
      type: String,
    }, // ABAC
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }

  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }

  this.username = `${slugify(this.name, { lower: true })}${Math.floor(
    Math.random() * 1001 + 3
  )}`;

  next();
});

const AdminUser = model("AdminUser", AdminUserSchema);

module.exports = AdminUser;
