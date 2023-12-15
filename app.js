const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/db");

const ejs=require('ejs')
app.set('view engine','ejs')
app.set('views','./views')

app.get('/',async(req,resp)=>{
   resp.render('home')
})
const adminRouter = require("./router/adminRouter");
app.use("/admin", adminRouter);

const userRouter = require("./router/userRouter");
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("server is listening port no 3000");
});
