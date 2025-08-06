const { Schema, model } = require("mongoose");
const {
  ModelRefNames,
  Gender,
  UserLoginType,
  VerifyStatus,
  AvailableSocialLogins,
  AvailableUserStatus,
  RolesId,
  UserStatusEnum,
} = require("../../constants");
const {
  comparePassword,
  hashPassword,
} = require("../../libs/passwordBcrypt.libs");

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: String,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      minlength: 8,
    },

    phoneNumber: {
      type: String,
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: ModelRefNames.Role,
      default: RolesId.COSTUMER,
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

    provider: [
      {
        type: String,
        enum: AvailableSocialLogins,
        default: UserLoginType.LOCAL,
      },
    ],
    providerId: {
      type: String,
    }, // Google/Facebook/Apple user ID

    isEmailVerified: {
      type: Boolean,
      enum: [VerifyStatus.VERIFY, VerifyStatus.UNVERIFIED],
    },
    isDeleted: {
      type: Boolean,
    },
    // isActive: {
    //   type: Boolean,
    //   enum: AvailableUserStatus,
    //   // default: UserStatusEnum.ACTIVE,
    // },
    status: {
      type: String,
      enum: AvailableUserStatus,
      default: UserStatusEnum.ACTIVE,
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

    verificationCode: {
      type: String,
      // unique: true,
      index: true,
    },
    verificationCodeExpiry: {
      type: Date,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// this function do password hashing using bcrypt.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// this methods do compare user password
userSchema.methods.compareBcryptPassword = async function (password) {
  return await comparePassword(password, this.password);
};

const User = model(ModelRefNames.User, userSchema);
module.exports = User;
