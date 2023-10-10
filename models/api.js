const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const apiSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
    },
    originUrl: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// apiSchema.pre("save", async function (next) {
//   const salt = bcrypt.genSaltSync(10);
//   this.apiKey = await bcrypt.hash(this.apiKey, salt);
// });

// apiSchema.methods.isValidApiKey = async function (enteredApiKey) {
//   return await bcrypt.compare(enteredApiKey, this.apiKey);
// };

module.exports = mongoose.model("Api", apiSchema);
