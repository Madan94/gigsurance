import mongoose from "mongoose";

export interface IPlan extends mongoose.Document {
    planId:string;
    name:string;
    initialPayment:string;
    weeklyPayment:string;
    durationInWeeks:number;
    score:number;//0 to 1 (0.1)
    expiryTimePeriod:string; // number of weeks weeks
    createdAt:Date;
    updatedAt:Date;
}

function planIdGenerator() {
   return `PLAN-${crypto.randomUUID().split('-')[0].toUpperCase()}`;
}

const PlanSchema = new mongoose.Schema<IPlan>({
    planId:{
        type:String,
        unique:true,
        default:planIdGenerator
    },
    name:{type:String,required:true},
    initialPayment:{type:String,required:true},
    weeklyPayment:{type:String,required:true},
    durationInWeeks:{type:Number,required:true},
    score:{type:Number,required:true},
    expiryTimePeriod:{type:String,required:true},
},{
    timestamps:true,
});

const PlanModel = mongoose.model<IPlan>("Plan",PlanSchema);
export default PlanModel;