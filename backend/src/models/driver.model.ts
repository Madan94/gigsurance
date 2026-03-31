import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDriver extends Document {
    driverId:string;
    personalData :{
        username:string;
        phoneNumber:string;
        email:string;
        dob:Date;
        gender:string;
        profilePicture:string;
    };
    otpCache?: {
        otpHash:string;
        expiresAt:Date;
    }
    platformDetails:{
        platform:"FoodDelivery" | "Quick-Commerce" | "E-Commerce" | "Ride-Sharing";
        region :{
            city:string;
            zone:string;
        };
        workPattern:{
            day:string;//hrs
            week:string;//days
        };
    };
    insurancePlan:{
        plan:string;
        initialPaymentPaid:boolean;
        numberOfWeeksPaid:number;
        weeklyPayment:{
            amount:string;
            dueDate:Date;
        };
        expiryDate:Date;
    };
    wallet:{
        totalAmount:number;
        transactions:{
            credited:[];
            debited:[];
        };
    };
    createdAt:Date;
    updatedAt:Date; 
}

function driverIdGenerator() {
    return "DRIVER-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

const DriverSchema: Schema = new Schema({
    driverId: {
        type: String,
        unique: true,
        default: driverIdGenerator
    },
    personalData:{
        username:{type:String,required:true},
        phoneNumber:{type:String,required:true},
        email:{type:String,required:true},
        dob:{type:Date,required:true},
        gender:{type:String,required:true},
        profilePicture:{type:String,required:false,default:""},
    },  
    otpCache:{
        otpHash:{type:String,required:false,default:""},
        expiresAt:{type:Date,required:false,default:null},
    },
    platformDetails:{
        platform:{type:String,enum:["FoodDelivery","Quick-Commerce","E-Commerce","Ride-Sharing"],required:true},
        region :{
            city:{type:String,required:true},
            zone:{type:String,required:true},
        },
        workPattern:{
            day:{type:String,required:true},
            week:{type:String,required:true},
        },
    },
    insurancePlan:{
        plan:{type:String,required:true},
        initialPaymentPaid:{type:Boolean,required:true},
        numberOfWeeksPaid:{type:Number,required:true},
        weeklyPayment:{
            amount:{type:String,required:true},
            dueDate:{type:Date,required:true},
        },
        expiryDate:{type:Date,required:true},
    },
    //scale wallet into new schema later
    wallet:{
        totalAmount:{type:Number,required:true,default:0},
        transactions:{
            credited:{type:Array,default:[]},
            debited:{type:Array,default:[]},
        },
    },
},{timestamps:true});

const Driver: Model<IDriver> = mongoose.model<IDriver>("Driver", DriverSchema);

export default Driver;