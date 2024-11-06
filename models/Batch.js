const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
    name:{type:String, required:true},
    student:{type:[mongoose.Types.ObjectId], ref:"student"},
    timing:{type:String, required:true},
    course:{type:mongoose.Types.ObjectId, ref:"course"},
    isDelete:{type:Boolean, default:false},
    // student:{type:[mongoose.Types.ObjectId], ref:"batch"}
},{timestamps:true})

module.exports = mongoose.model("batch", batchSchema)