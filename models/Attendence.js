const mongoose = require("mongoose")

const attendenceSchema = new mongoose.Schema({
    student:{type:mongoose.Types.ObjectId,ref:"student"},
    isPresent:{type:Boolean,default:true},
    mode:{type:String,default:"offline",  required:true, enum:["online", "offline"]},
    date:{type:Date, required:true}
},{timestamps:true})

module.exports = mongoose.model("attendence", attendenceSchema) 