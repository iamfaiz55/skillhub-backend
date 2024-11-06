const asyncHandler = require("express-async-handler")
const Student = require("../models/Student")
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { uploadProfile } = require("../utils/upload");
// const { OAuth2Client } = require("google-auth-library");
// const { uploadProfile } = require("../utils/upload");



exports.continueWithGoogle = asyncHandler(async (req, res) => {
    const { credential } = req.body;
  
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
    const verify = await client.verifyIdToken({ idToken: credential });
    if (!verify) {
      res.status(400).json({ message: "unable to verify" });
    }
    const { email, name, picture } = verify.payload;
    console.log( email, name, picture);
    const result = await Student.findOne({ email });
  
  
    if (!result) {
      const studentData = await Student.create({ name, email, avatar:picture });
  
      const token = jwt.sign({ userId: studentData._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
  
      res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({
        message: "register success",
        result: { name, email,avatar: picture },
      });
  
    } else {
      // token and cookie
      const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
  
      res.cookie("student", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.json({ message: "Login  Success ", result });
    }
  });
  exports.logoutStudent = asyncHandler(async (req, res) => {
    res.clearCookie("student");
    res.json({ message: "Logout Success" });
  });
  exports.updateStudent = asyncHandler(async(req, res)=> {
    // console.log(req.body);
      const {studentUpdateId} = req.params
      // console.log(req.body);
      uploadProfile(req, res, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: err.message || "Unable To Upload" });
        }
        if (req.file) {
          await Student.findByIdAndUpdate(studentUpdateId, {...req.body, avatar: req.file.filename });
        } else {
          await Student.findByIdAndUpdate(studentUpdateId, req.body);
        }
        res.status(200).json({ message: "User Create success" });
      });
  })