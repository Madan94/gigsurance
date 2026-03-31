import mongoose from "mongoose";

export interface IRegions extends mongoose.Document {
    city:string;
    zones:string[];
    createdAt:Date;
    updatedAt:Date;
}

const RegionsSchema = new mongoose.Schema<IRegions>({
    city:{type:String,required:true,unique:true},
    zones:{type:[String],required:true},
},{
    timestamps:true,
});

const RegionsModel = mongoose.model<IRegions>("Regions",RegionsSchema);
export default RegionsModel;