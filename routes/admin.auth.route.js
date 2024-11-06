const router = require("express").Router()
const authController = require("./../controllers/admin.auth.controller")

router
    // admin authentication
    .post("/adminRegister", authController.registerAdmin)
    .post("/adminLogin", authController.loginAdmin)
    .post("/adminLogout", authController.logoutAdmin)      
    .post("/verifyOTP", authController.verifyOTP)      
        



module.exports = router