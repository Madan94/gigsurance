import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import plans from "/src/model/plans.model.js";
import driverModel from "/src/models/driver.model.js";

class Initialization {

    sendError(
    res: any,
    message = "Something went wrong",
    status: any = 500,
    extra: any = {}
  ): any {
    if (typeof this.sendError === "function") {
      try {
        return this.sendError(message, status);
      } catch (e) {
        return res.status(status).json({ success: false, message, ...extra });
      }
    }
    return res.status(status).json({ success: false, message, ...extra });
  }

  sendSuccess(res: any, message = "OK", data: any = {}, status = 200): any {
    if (typeof this.sendSuccess === "function") {
      try {
        return this.sendSuccess(message, data);
      } catch (e) {
        return res.status(status).json({ success: true, message, data });
      }
    }
    return res.status(status).json({ success: true, message, data });
  }

    async createPlans(req: any, res: any) {
        try {
            const {name , initialPayment, weeklyPayment, durationInWeeks, score, expiryTimePeriod} = req.body;
            if(!name || !initialPayment || !weeklyPayment || !durationInWeeks || !score || !expiryTimePeriod){
                return this.sendError(res,"All fields are required",400);
            }
            const newPlan = new plans({
                name,
                initialPayment,
                weeklyPayment,
                durationInWeeks,
                score,
                expiryTimePeriod,
            });
            await newPlan.save();
            return this.sendSuccess(res,"Plan created successfully",newPlan);
        } catch (error) {
            console.error("Error in createPlans:", error);
            return this.sendError(res, "Internal server error", 500);
        }

    }

    async createRegions(req: any, res: any) {
        try{
            const {city, zone} = req.body;
            if(!city || !zone){
                return this.sendError(res,"City and Zone are required",400);
            }
            //check if city already exists
            const existingDriver = await driverModel.findOne({"platformDetails.region.city":city});
            if(existingDriver){
                //add zone to existing city
                existingDriver.platformDetails.region.zone.push(zone);
                await existingDriver.save();
                return this.sendSuccess(res,"Zone added to existing city successfully",existingDriver);
            }
            //create new city with zone
            const newDriver = new driverModel({
                platformDetails:{
                    region:{
                        city,
                        zone:[zone],
                    },
                },
            });
            await newDriver.save();
            return this.sendSuccess(res,"City and Zone created successfully",newDriver);    
        }catch(error){
            console.error("Error in createRegions:", error);
            return this.sendError(res, "Internal server error", 500);
        }
    }

}
export default Initialization;