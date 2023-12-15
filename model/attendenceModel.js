const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    attendence: {
      type: Boolean,
      default: false,
    },
    attendenceDate: {
      type: String,
      require: true,
    },
    attendenceTime: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const ATTENDENCE = mongoose.model("ATTENDENCE", Schema);
module.exports = ATTENDENCE;
