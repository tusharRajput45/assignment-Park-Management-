const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    task: {
      type: String,
      require: true,
    },
    timing: {
      type: String,
      require:true,
    },
    remark:{
      type:String,
      default:'incomplete',
    }
  },
  {
    timestamps: true,
  }
);
const TASK = mongoose.model("TASK", Schema);
module.exports = TASK;
