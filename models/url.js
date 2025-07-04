const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      require: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  { timeStamp: true }
);

const url = mongoose.model("url", urlSchema);

module.exports = url;
