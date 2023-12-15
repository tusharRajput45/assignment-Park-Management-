const express=require('express')
const adminRouter=express()

const ejs=require('ejs')
adminRouter.set('view engine','ejs')
adminRouter.set('views','./views/admin')

const adminController=require('../controller/adminController')
adminRouter.get('/',async(req,resp)=>{
    resp.render('adminLogin.ejs')
})
adminRouter.get('/add-new-user',async(req,resp)=>{
    resp.render('addUserByAdmin.ejs')
})
adminRouter.post('/create-admin',adminController.createAdmin)
adminRouter.post('/login-admin',adminController.loginAdmin)
adminRouter.post('/create-user',adminController.createUserByAdmin)
adminRouter.get('/admin-dashboard',adminController.adminDashboard)
adminRouter.delete('/delete-user',adminController.deleteUserByAdmin)
adminRouter.put('/edit-status-user',adminController.editUserStatusByAdmin)
adminRouter.get('/get-user',adminController.getUser)
adminRouter.put('/edit-user',adminController.editUser)
adminRouter.get('/user-task',adminController.userTask)
adminRouter.post('/add-task',adminController.addUserTask)
adminRouter.delete('/delete-task',adminController.deleteTask)
adminRouter.get('/get-task',adminController.getTask)
adminRouter.put('/edit-task',adminController.editTask)
adminRouter.get('/admin-attendence',adminController.attendence)








module.exports=adminRouter