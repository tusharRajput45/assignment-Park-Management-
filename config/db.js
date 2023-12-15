const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/parkDB")
  .then(() => {
    console.log("Database succesfully connect");
  })
  .catch(() => {
    console.log("MongoDB Error");
  });
  

  module.exports=mongoose