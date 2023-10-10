const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    content: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
