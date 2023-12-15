const USER = require("../model/userModel");
const ATTENDENCE = require("../model/attendenceModel");
const TASK = require("../model/taskModel");

const bcrypt = require("bcrypt");
module.exports = {
  loginUser: async (req, resp) => {
    try {
      const checkUserID = await USER.findOne({ userID: req.body.userID });
      if (checkUserID) {
        const matchPassword = await bcrypt.compare(
          req.body.password,
          checkUserID.password
        );
        if (!matchPassword) {
          console.log("Password is incorrect");
        } else {
          if (checkUserID.status === "activated") {
            resp.send({
              statusCode: "201",
              status: "success",
              statusMessage: "Successfully Login User",
              data: checkUserID,
            });
          }
        }
      } else {
        console.log("User ID is not exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  userDashbord: async (req, resp) => {
    try {
      const checkUser = await USER.findOne({ _id: req.query._id });
      const getAtt = await ATTENDENCE.find({ userID: req.query._id });
      resp.render("userDashboard", { result: checkUser, attendence: getAtt });
    } catch (error) {
      console.log(error.message);
    }
  },
  userTask: async (req, resp) => {
    try {
      const getTask = await TASK.find({ userID: req.query._id });
      const getUser = await USER.findOne({ _id: req.query._id });
      if (getTask) {
        resp.render("userTask", { result: getTask, user: getUser });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  userAttendence: async (req, resp) => {
    try {
      const getUser = await USER.findOne({ _id: req.body._id });
      const attendenceDate = new Date().toLocaleDateString();
      const attendenceTime = new Date().toLocaleTimeString();
      if (getUser) {
        const inputData = new ATTENDENCE({
          userID: getUser._id,
          userName: getUser.name,
          attendence: true,
          attendenceDate: attendenceDate,
          attendenceTime: attendenceTime,
        });
        const saveData = await inputData.save();
        if (saveData) {
          resp.send({
            statusCode: "200",
            status: "success",
            statusMessage: "Successfully attendence save",
            data: saveData,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  taskRemark: async (req, resp) => {
    console.log(req.body._id);
    try {
      const inputData = {};
      if (req.body.remark) {
        inputData.remark = req.body.remark;
      }
      const UpdateData = await TASK.updateOne(
        { _id: req.body._id },
        { $set: inputData },
        { new: true, lean: true }
      );
      if (UpdateData) {
        resp.send({
          statusCode: "201",
          status: "success",
          statusMessage: "Successfully edit remark by User",
          data: UpdateData,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
