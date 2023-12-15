const ADMIN = require("../model/adminModel");
const USER = require("../model/userModel");
const TASK = require("../model/taskModel");
const ATTENDENCE=require('../model/attendenceModel')

const randomNumber = require("generate-serial-number");
const bcrypt = require("bcrypt");

const securePassword = require("../helper/securePassword");
const sendEmail = require("../helper/sendEmail");

module.exports = {
  createAdmin: async (req, resp) => {
    const hashPassword = await securePassword(req.body.password);
    const userID = await randomNumber.generate(6);
    try {
      const inputData = new ADMIN({
        userID: userID,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPassword,
      });
      const saveData = await inputData.save();
      if (saveData) {
        resp.status(200).send({
          statusCode: "200",
          statusMessage: "Admin Create Successfully",
          data: saveData,
        });
      }
    } catch (error) {
      console.log("internal server error");
    }
  },
  loginAdmin: async (req, resp) => {
    try {
      const checkUserID = await ADMIN.findOne({ userID: req.body.userID });
      if (checkUserID) {
        const matchPassword = await bcrypt.compare(
          req.body.password,
          checkUserID.password
        );
        if (!matchPassword) {
          console.log("Password is incorrect");
        } else {
          resp.status(201).send({
            statusCode: "201",
            statusMessage: "successfully login admin",
            status: "success",
            data: checkUserID,
          });
        }
      } else {
        console.log("User ID is not exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  createUserByAdmin: async (req, resp) => {
    console.log(req.body);
    try {
      const hashPassword = await securePassword(req.body.password);
      const userID = await randomNumber.generate(6);
      const inputData = new USER({
        userID: userID, 
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPassword,
      });
      const saveData = await inputData.save();
      if (saveData) { 
        // sendEmail(req.body.email,userID,req.body.password)
        resp.status(200).send({
          statusCode: "200",
          statusMessage: "user create by admin",
          data: saveData,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  adminDashboard: async (req, resp) => {
    try {
      const checkUserID = await ADMIN.findOne({ _id: req.query._id });
      const user = await USER.find();
      if (checkUserID) {
        resp.render("admin-dashboard", { result: checkUserID, user: user });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteUserByAdmin: async (req, resp) => {
    try {
      const deleteData = await USER.deleteOne({ _id: req.query._id });
      if (deleteData) {
        resp.send({
          statusCode: "201",
          statusMessage: "successfully delete user by admin",
          status: "success",
          data: deleteData,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  editUserStatusByAdmin: async (req, resp) => {
    try {
      const checkUser = await USER.findOne({ _id: req.query._id });
      let userStatus;
      if (checkUser.status === "deactivated") {
        userStatus = "activated";
      } else {
        userStatus = "deactivated";
      }
      let editStatus = {};
      if (userStatus) {
        editStatus.status = userStatus;
      }
      let UpdateData = await USER.updateOne(
        { _id: req.query._id },
        { $set: editStatus },
        { new: true, lean: true }
      );
      if (UpdateData) {
        resp.send({
          statusCode: "201",
          statusMessage: "Successsfully Change user status",
          status: "success",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  getUser: async (req, resp) => {
    try {
      const getUser = await USER.findOne({ _id: req.query._id });
      if (getUser) {
        resp.send({
          statusCode: "201",
          statusMessage: "Successsfully get user",
          status: "success",
          data: getUser,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  editUser: async (req, resp) => {
    try {
      const inputData = {};
      if (req.body.name) {
        inputData.name = req.body.name;
      }
      if (req.body.email) {
        inputData.email = req.body.email;
      }
      if (req.body.mobile) {
        inputData.mobile = req.body.mobile;
      }
      const UpdateData = await USER.updateOne(
        { _id: req.body._id },
        { $set: inputData },
        { new: true, lean: true }
      );
      if (UpdateData) {
        resp.send({
          statusCode: "201",
          statusMessage: "Successsfully edit user",
          status: "success",
          data: UpdateData,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  userTask: async (req, resp) => {
    try {
      const getTask = await TASK.find({ userID: req.query._id });
      const getUser = await USER.findOne({ _id: req.query._id });
      if (getTask) {
        resp.render("task", { result: getTask, user: getUser });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  addUserTask: async (req, resp) => {
    try {
      const inputData =new TASK.insertMany({
           
      })
      // ({
      //   userID: req.body._id,
      //   task: req.body.task,
      //   timing: req.body.timing,
      // });
      const saveData = await inputData.save();
      if (saveData) {
        resp.send({
          statusCode: "200",
          statusMessage: "Successsfully add task by admin",
          status: "success",
          data: saveData,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteTask: async (req, resp) => {
    try {
      const deleteTask = await TASK.deleteOne({ _id: req.body._id });
      if (deleteTask) {
        resp.send({
          statusCode: "201",
          statusMessage: "Successsfully delete task by admin",
          status: "success",
          data: deleteTask,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  getTask: async (req, resp) => {
    try {
      const getTask = await TASK.findOne({ _id: req.query._id });
      if (getTask) {
        resp.send({
          statusCode: "201",
          statusMessage: "Successsfully get task by admin",
          status: "success",
          data: getTask,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  editTask: async (req, resp) => {
    console.log(req.body);
    try {
      const inputData = {};
      if (req.body.task) {
        inputData.task = req.body.task;
      } 
      if (req.body.timing) {
        inputData.timing = req.body.timing;
      }
      let UpdateData = await TASK.updateOne(
        { _id: req.body._id },
        { $set: inputData },
        { new: true, lean: true }
      );
      if (UpdateData) {
        resp.send({
          statusCode: "201",
          statusMessage: "Successsfully edit task by admin",
          status: "success",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  attendence: async (req, resp) => { 
    try {
      const getAttendence=await ATTENDENCE.find({userID:req.query._id})
      console.log(getAttendence);
      if (getAttendence) {
        resp.render('attendence',{result:getAttendence})
      }
    } catch (error) {
      console.log(error.message); 
    }
  },
};
