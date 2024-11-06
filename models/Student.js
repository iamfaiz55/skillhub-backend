const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    mobile:{type:String},
    email:{type:String, required:true},
    avatar:{type:String},
    address:{type:String},
    education:{type:String},
    active:{type:Boolean, default:false},
    isDeleted:{type:Boolean, default:true},
    blockReason:{type:String},
    batch:{type:mongoose.Types.ObjectId, ref:"batch"}
},{timestamps:true})

module.exports = mongoose.model("student", studentSchema)