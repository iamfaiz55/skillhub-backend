const mongoose = require("mongoose")

const feesSchema = new mongoose.Schema({
   student:{type:mongoose.Types.ObjectId, ref:"student"},
   course:{type:mongoose.Types.ObjectId, ref:"course"},
   amount:{type:Number, required:true},
   feesLeft:{type:Number},
   paymentType:{type:String, required:true},
   chequeNumber:{type:Number},
   rtgsNumber:{type:Number},
   transectionNumber:{type:Number},
   monthlyEmi:{type:Number},
   emiPlan:{type:Number},
},{timestamps:true})

module.exports = mongoose.model("fees", feesSchema)