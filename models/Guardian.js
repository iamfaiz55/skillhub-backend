const mongoose = require("mongoose")

const guardianSchema = new mongoose.Schema({
    name:{type:String, required:true},
    relation:{type:String, required:true},
    email:{type:String, },
    mobile:{type:Number, required:true},
    address:{type:String, required:true},
    student:{type:mongoose.Types.ObjectId, ref:"student"},
    isDelete:{type:Boolean, default:false},
},{timestamps:true})

module.exports = mongoose.model("guardian", guardianSchema)