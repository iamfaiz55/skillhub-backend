const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    name:{type:String, required:true},
    duration:{type:String, required:true},
    content:{type:String, required:true},
    fees:{type:Number, required:true},
    criteria:{type:String, required:true},
    isDeleted:{type:Boolean, default:false},
},{timestamps:true})

module.exports = mongoose.model("course", courseSchema)