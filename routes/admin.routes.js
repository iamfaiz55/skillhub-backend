const routes = require("express").Router()
const adminControllers = require("./../controllers/admin.controller")

routes
      // course 1
     .get("/getAllCourses", adminControllers.getAllCorses)
     .get("/getCourse/:id", adminControllers.getCourse)
     .post("/addCourse", adminControllers.addCourse)
     .put("/updateCourse/:courseUpdateId", adminControllers.updateCourse)
     .put("/disableCourse/:courseDisableId", adminControllers.disableCourse)
     .put("/unableCourse/:courseUnableId", adminControllers.unableCourse)

      // student 2
     .get("/getAllStudents", adminControllers.getAllStudent)
     .post("/addStudentManually", adminControllers.addStudentManual)
     .get("/getSingleStudent/:student", adminControllers.getSingleStudent)
     .put("/disableStudent/:id", adminControllers.disableStudent)
     .put("/unableStudent/:id", adminControllers.unableStudent)

      // batch 3      
      .get("/getAllBAtches", adminControllers.getAllBatches)
      .post("/addBatch", adminControllers.addBatch)
      .put("/updateBatch/:batchUpdateId", adminControllers.updateBatch)
      .put("/disableBatch/:batchDisableId",adminControllers.disableBatch )
      .put("/unableBatch/:batchUnableId",adminControllers.unableBatch )

      // attendence 4
      .get("/getStudAttendence/:studId", adminControllers.getAttendence)
      .get("/getStudentsForAttendence/:batchId", adminControllers.getStudentByBatch)
      .get("/geAttendenceByDate/:date", adminControllers.getAttendenceByDate)
      .post("/addAttendence", adminControllers.addAttendence)
      .put("/updateAttendence/:attendenceId", adminControllers.updateAttendence)

      // Guardian 5
      .get("/getGuardian/:studentId", adminControllers.getGuardian)
      .post("/addGuardian", adminControllers.addGuardian)
      .put("/updateGuardian/:guardianId", adminControllers.updateGuardian)

      // fees 6
      .get("/getFeesDetails/:student", adminControllers.getFeesDetails)
      .get("/getAllLeftFeesStudent", adminControllers.getAllLeftFeesStudent)
      .get("/getAllCompleteFeesStudent", adminControllers.getAllCompleteFeesStudent)
      .post("/addFees", adminControllers.addfees)
      .put("/updateFees/:feesId", adminControllers.updateFees)

      // enroll 7
      .post("/enrollStudentToBatch", adminControllers.enrollStudentToBatch)
      .put("/removeStudentFromBAtch/:enrollId", adminControllers.removeStudentFromBatch)

   
module.exports = routes
