const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { ModelRefNames } = require("../../constants");

const storeAddressSchema = new Schema(
  {
    addressLine: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const StoreSchema = new Schema({
  storeName: {
    type: String,
    required: true,
    trim: true,
  },
  storeUID: {
    type: String,
    default: uuidv4(),
  },
  storeURI: { type: String },

  storeDescription: {
    type: String,
    trim: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: ModelRefNames.Seller,
  },
  logo: {
    _id: false,
    type: {
      url: {
        type: String,
      },
      localPath: {
        type: String,
      },
    },
    default: {
      url: `https://via.placeholder.com/200x200.png`,
      localPath: "",
    },
  },
  banner: {
    _id: false,
    type: {
      url: {
        type: String,
      },
      localPath: {
        type: String,
      },
    },
    default: {
      url: `https://via.placeholder.com/1500x350.png`,
      localPath: "",
    },
  },

  storeAddress: {
    type: storeAddressSchema,
  },
});

const Store = model(ModelRefNames.Store, StoreSchema);
module.exports = Store;
