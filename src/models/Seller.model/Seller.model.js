const { Schema, model } = require("mongoose");
const {
  ModelRefNames,
  UserStatusEnum,
  VerifyStatus,
  AvailableUserStatus,

  Gender,
  RolesId,
} = require("../../constants");
const { hashPassword } = require("../../libs/passwordBcrypt.libs");
const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: ModelRefNames.Store,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: ModelRefNames.Role,
      default: RolesId.SELLER,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    preferredCurrency: {
      type: String,
      default: "USD", // Replace with your default currency
    },
    preferredLanguage: {
      type: String,
      default: "en-US", // Replace with your default language
    },
    newsletterSubscription: {
      type: Boolean,
      default: false,
    },
    marketingOptIn: {
      type: Boolean,
      default: false,
    },

    gender: {
      type: String,
      uppercase: true,
      enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
    },

    isEmailVerified: {
      type: Boolean,
      enum: [VerifyStatus.VERIFY, VerifyStatus.UNVERIFIED],
      default: VerifyStatus.UNVERIFIED,
    },
    status: {
      type: String,
      enum: AvailableUserStatus,
      default: UserStatusEnum.PENDING,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },

    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    // Add additional fields as needed, like:
    // - logo: { type: String },
    // - products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    // - ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
  },
  { timestamps: true }
);

sellerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const Seller = model(ModelRefNames.Seller, sellerSchema);

module.exports = Seller;
