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
    status: {
      type: String,
      default: "deactivated",
    },
  },
  {
    timestamps: true,
  }
);
const USER = mongoose.model("USER", Schema);
module.exports = USER;
