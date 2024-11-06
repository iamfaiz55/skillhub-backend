const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")

const Course = require("../models/Course")
const Student = require("../models/Student")


const Batch = require("../models/Batch");
const Attendence = require("../models/Attendence");
const Guardian = require("../models/Guardian");
const Fees = require("../models/Fees");
const Enroll = require("../models/Enroll");

const sendEmail = require("../utils/email");
const { checkEmpty } = require("../utils/checkEmpty");




//Attendence 1
//  __________________________________________________________________________________
exports.getAttendence = asyncHandler(async (req, res) => {
  const { studId } = req.params;
  // console.log(studId);
  const result = await Attendence.find({ student:studId});
  res.status(200).json({ message: "Attendence Fetch Success", result });
});
exports.getAttendenceByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  // console.log(date);
  const result = await Attendence.find({date}).populate("student")
  res.status(200).json({ message: "Attendence Fetch Success", result });
});
exports.addAttendence = asyncHandler(async (req, res) => {
  // const {studs, mode} = req.body
  const x = req.body.map((item) => {
    return { student: item.student, date: item.date, isPresent: item.isPresent , mode: item.mode };
  });
  const result = await Attendence.findOne({
    studId: x[0].studId,
    date: x[0].date,
  });
  if (result) {
    return res.status(400).json({ message: "Dupelicate Date" });
  }
  await Attendence.create(x);
  res.json({ message: "Attendence Add Success" });
});
exports.updateAttendence = asyncHandler(async (req, res) => {
  const { attendenceId } = req.params;
  await Attendence.findByIdAndUpdate(attendenceId, req.body);
  res.json({ message: "Attendence Update Success" });
});
exports.getStudentByBatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  const result = await Student.find({ batch:batchId });
  res.json({ message: "Batch Wise Student Fetch Success", result });
})




// batch 2
// ___________________________________________________________________________________
exports.getAllBatches = asyncHandler(async(req, res)=> {
  const result = await Batch.find()
  res.json({message:"All Batches Fetch Success", result})
 })
 
 exports.addBatch = asyncHandler(async(req, res)=> {
     await Batch.create(req.body)
    //  console.log(req.body);
     res.json({message:"Batche Create Success", })
 })
 exports.updateBatch = asyncHandler(async(req, res)=> {
   const {batchUpdateId} = req.params
     await Batch.findByIdAndUpdate(batchUpdateId,req.body)
     res.json({message:"Batche Update Success", })
 })
 exports.disableBatch= asyncHandler(async(req, res)=> {
   const {batchDisableId} = req.params
     await Batch.findByIdAndUpdate(batchDisableId,{...req.body, isDelete:true})
     res.json({message:"Batche Disabled Success", })
 })
 
 exports.unableBatch= asyncHandler(async(req, res)=> {
   const {batchUnableId} = req.params
     await Batch.findByIdAndUpdate(batchUnableId,{...req.body, isDelete:false})
     res.json({message:"Batche Unabled Success", })
 })
 
 
 
 



// Course 3
//  _____________________________________________________________
exports.getAllCorses = asyncHandler(async(req, res)=> {
    const result = await Course.find()
    res.json({message:"All Courses Fetch Success", result})
})
exports.getCourse = asyncHandler(async(req, res)=> {
  const {id} = req.params
    const result = await Course.findOne({_id: id})
    // console.log(result);
    res.json({message:"Course Fetch Success", result})
})
exports.addCourse = asyncHandler(async(req, res)=> {
const {name ,duration ,content, fees , criteria} = req.body
   await Course.create({name, duration, content, fees, criteria})
    res.json({message:"Course Add Success"})
})
exports.updateCourse = asyncHandler(async(req, res)=> {
    const {courseUpdateId} = req.params
    await Course.findByIdAndUpdate(courseUpdateId, req.body)
    res.json({message:"Course Update Success"})
})
exports.disableCourse = asyncHandler(async(req, res)=> {
     const {courseDisableId} = req.params
     await Course.findByIdAndUpdate(courseDisableId, {...req.body, isDeleted:true})
    res.json({message:"Course Disabled Success"})
})
exports.unableCourse = asyncHandler(async(req, res)=> {
     const {courseUnableId} = req.params
     await Course.findByIdAndUpdate(courseUnableId, {...req.body, isDeleted:false})
    res.json({message:"Course Unabled Success"})
})



// enroll 4
// ___________________________________________________________________________________
exports.enrollStudentToBatch = asyncHandler(async(req, res)=> {
  await Enroll.create(req.body)
  res.json({message:"Student Enrolled Success"})
})
exports.removeStudentFromBatch = asyncHandler(async(req, res)=> {
  const {enrollId}= req.params
  await Enroll.findByIdAndUpdate(enrollId, {...req.body, isDisable: true})
  res.json({message:"Student Enrolled Success"})
})


//  fees 5
// ___________________________________________________________________________________
exports.addfees= asyncHandler(async(req, res)=> {
  const {
      student,
      course,
      amount,
      paymentType,
      chequeNumber,
      rtgsNumber,
      transectionNumber
 } = req.body
 const studentData = await Student.findOne({_id :student})
 const courseData = await Course.findOne({_id :course})

 const feesLeft = (courseData.fees - amount)
 // console.log(feeLeft);
await sendEmail(
 studentData.email,
  `SKILLHUB ${courseData.name} Fees`, 
  `Thanks ${studentData.name} For Paying Fees of Your Course  Amount ₹${amount} ` )
 await Fees.create({...req.body, feesLeft})
 res.json({message:"Fees Added Success"})
})

exports.getFeesDetails= asyncHandler(async(req, res)=> {
  const {student}=req.params
  const result = await Fees.findOne({student}).populate("course")
  res.json({message:"Fees Fetch Success", result})
})
exports.getAllLeftFeesStudent= asyncHandler(async(req, res)=> {
  const result = await Fees.find({ feesLeft: { $gt: 0 } }).populate("student").populate("course")

  res.json({message:"Fees Fetch Success", result})
})
exports.getAllCompleteFeesStudent= asyncHandler(async(req, res)=> {
  const result = await Fees.find({ feesLeft: { $lt: 1 } }).populate("student").populate("course")

  res.json({message:"Fees Fetch Success", result})
})

exports.updateFees = asyncHandler(async (req, res) => {
  const { feesId } = req.params;

  const paymentAmount = parseFloat(req.body.amount);
  if (isNaN(paymentAmount) || paymentAmount <= 0) {
    return res.status(400).json({ message: "Invalid payment amount" });
  }
    const result = await Fees.findOne({ _id: feesId }).populate("student");
    if (!result) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    // Calculate the updated amounts
    const updatedAmount = result.amount + paymentAmount;
    const dueLeft = result.feesLeft - paymentAmount;

    const amt = JSON.stringify(paymentAmount)

    await sendEmail(result.student.email, "Paying Emi", `Thanks For Paying Your Emi Of Rs ${amt}`);

    await Fees.findByIdAndUpdate(feesId, { amount: updatedAmount, feesLeft: dueLeft });
    res.json({ message: "Fees Update Success" });
});




// // Guardian 6
// //  _______________________________________________________________________________
exports.getGuardian = asyncHandler(async(req, res)=> {
  const {studentId} = req.params
  const result = await Guardian.findOne({student: studentId})
  res.json({message:"Guardian Fetch Success", result})
})
exports.addGuardian = asyncHandler(async(req, res)=> {
  await Guardian.create(req.body)
  res.json({message:"Guardian Add Success"})
})

exports.updateGuardian = asyncHandler(async(req, res)=> {
  const {guardianId}= req.params
  await Guardian.findByIdAndUpdate(guardianId,req.body)
  res.json({message:"Guardian Update Success"})
})




// Student 7
//  ___________________________________________________________________________
exports.getAllStudent = asyncHandler(async(req, res)=> {
    const result = await Student.find()
    res.json({message:"All Students Fetch Success", result})
})
exports.getSingleStudent = asyncHandler(async(req, res)=> {
  const {student} = req.params
  // console.log(student);
    const result = await Student.findOne({_id:student}).populate("batch")  
    res.json({message:"Student Fetch Success", result})
})
exports.disableStudent = asyncHandler(async(req, res)=> {
     const {id} = req.params
    //  console.log(id);
     await Student.findByIdAndUpdate(id, { isDeleted:false})
    res.json({message:"Student Disabled Success"})
})
exports.unableStudent = asyncHandler(async(req, res)=> {
     const {id} = req.params
    //  console.log(id);
     await Student.findByIdAndUpdate(id, { isDeleted:true})
    res.json({message:"Student Unabled Success"})
})

exports.addStudentManual = asyncHandler(async(req, res)=> {
  const {name , email, password }=req.body
  // const { name, email, password } = req.body
  const { isError, error } = checkEmpty({ name, email, password })
  if (isError) {
      return res.status(400).json({ message: "All Feilds Required", error })
  }

  const isFound = await Student.findOne({ email })
  if (isFound) {
      return res.status(400).json({ message: "email already registered with us" })
  }
  const hash = await bcrypt.hash(password, 10)
  await Student.create({ name, email, password: hash })

  res.json({ message: "Register Success" })
})




