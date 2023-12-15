const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userID: {
      type: Number,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    mobile: {
      type: Number,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const ADMIN = mongoose.model("ADMIN", Schema);
module.exports = ADMIN;
