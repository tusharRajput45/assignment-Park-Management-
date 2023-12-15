const express=require('express')
const userRouter=express()

const ejs=require('ejs')
userRouter.set('view engine','ejs')
userRouter.set('views','./views/user')


const userController=require('../controller/userController')

userRouter.get('/',async(req,resp)=>{resp.render('userLogin.ejs')})
userRouter.get('/user-dashboard',userController.userDashbord)
userRouter.post('/login-user',userController.loginUser)
userRouter.post('/attendence',userController.userAttendence)
userRouter.get('/user-task',userController.userTask)
userRouter.put('/task-remark',userController.taskRemark)



  
module.exports=userRouter