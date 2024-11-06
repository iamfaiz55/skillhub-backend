const mongoose = require("mongoose")

const enrollSchema = new mongoose.Schema({
    student:{type:mongoose.Types.ObjectId,ref:"student"},
    course:{type:mongoose.Types.ObjectId,ref:"course"},
    isDisable:{type:Boolean, default:false}
},{timestamps:true})

module.exports = mongoose.model("enroll", enrollSchema)