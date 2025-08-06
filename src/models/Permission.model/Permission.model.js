const { Schema, model } = require("mongoose");

const permissionSchema = new Schema(
  {
    name: { type: String, unique: true, required: true, index: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Permission = model("Permission", permissionSchema);
module.exports = Permission;
