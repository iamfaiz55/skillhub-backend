const asyncHandler = require("express-async-handler")


const { generateOTP } = require("../utils/generateOTP");
const Admin = require("../models/Admin");
const { checkEmpty } = require("../utils/checkEmpty");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email");

// Admin 8
// ______________________________________________________________________________________
exports.registerAdmin = asyncHandler(async(req, res)=>{
    console.log(req.body);
    const hash =  await bcrypt.hash(req.body.password, 10)
    await Admin.create({...req.body, password:hash})
    res.json({message:"Super Admin Register Success ", result:req.body.email})
  })
  
  exports.loginAdmin = asyncHandler(async(req, res)=>{
    const { password, userName}= req.body
    // console.log(password, userName);
    const {isError, error}= checkEmpty({userName, password})
    if(isError){
        return res.status(400).json({message:"All Feilds Required", error})
    }
        const result = await Admin.findOne({email:userName})
    if(!result){
        return res.status(400).json({message:"Invalid Credential - Email Not Found"})
    }
    
    const verify = await bcrypt.compare(password, result.password)
        if(!verify){
            return res.status(400).json({message:"Invalid Credential - password Do Not match"})
        }
  
        
      const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
  
      res.cookie("admin", token, { maxAge: 3600000 * 6 })
  
  
  const otp = generateOTP()
  // console.log(result.email);
  await Admin.findByIdAndUpdate(result._id, {otp})
  await sendEmail(result.email, "Login OTP", `${otp} Is Your OTP`)
    // await sendEmail(result.email, "Login OTP", `${otp} Is Your OTP`)
    
    res.json({message:"Admin Login OTP SEND Success ", result:userName})
  })
  
  exports.verifyOTP = asyncHandler(async(req, res)=> {
    const { email, otp } = req.body
    // console.log(req.body);
    const {isError, error}= checkEmpty({otp})
    if(isError){
        return res.status(400).json({message:"All Fields required", error})
    }
      const result = await Admin.findOne({email})
       // console.log(result.otp, otp);
       if(result.otp !== otp){
        return res.status(400).json({message:"Invalid OTP"})
       }
  
       const token = jwt.sign(
        {userId: result},
        process.env.JWT_KEY,
        {expiresIn:process.env.JWT_EXPIRY || "1d"}
       )
       res.cookie("admin", token, {maxAge:86400000, httpOnly:true, sameSite: 'strict' })
  
       
       res.json({message:"Login Success", result})
  })
  
  exports.logoutAdmin = asyncHandler(async(req, res)=>{
    res.clearCookie("admin")
    res.json({message:"Admin Logout Success"})
  })