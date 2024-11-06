const router = require("express").Router()
const userControllers = require("./../controllers/user.controller")

router
      .post("/googlelogin", userControllers.continueWithGoogle)
      .post("/logoutStudent", userControllers.logoutStudent)
      .put("/updateStudent/:studentUpdateId", userControllers.updateStudent)
      


module.exports = router