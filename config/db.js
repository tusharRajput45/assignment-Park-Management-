const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://tusharrajput919:window@test-usm.p4ufnvq.mongodb.net/ParkingDB?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database succesfully connect");
  })
  .catch(() => {
    console.log("MongoDB Error");
  });
  

  module.exports=mongoose
