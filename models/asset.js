const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
    },
    bedrooms: {
      type: Number,
      default: 1,
      required: true,
    },
    bathrooms: {
      type: Number,
      default: 1,
      required: true,
    },
    toilets: {
      type: Number,
      default: 1,
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
