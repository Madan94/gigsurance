import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import driverModel from "../models/driver.model.js";
import RegionsModel from "../models/regions.model.js";
import plansModel from "../models/plans.model.js";
import { sendError, sendSuccess } from "../middleware/responseHandler.js";

type RegisterBody = {
  username: string;
  phoneNumber: string;
  email: string;
  dob: string | Date;
  gender: string;
  platform: "FoodDelivery" | "Quick-Commerce" | "E-Commerce" | "Ride-Sharing";
  region: { city: string; zone: string };
  workPattern: { day: string; week: string };
  insuranceId?: string;
};

function signToken(driverId: string) {
  return jwt.sign({ id: driverId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

class DriverAuthController {
  async register(req: Request, res: Response) {
    try {
      const {
        username,
        phoneNumber,
        email,
        dob,
        gender,
        platform,
        region,
        workPattern,
        insuranceId,
      } = req.body as Partial<RegisterBody>;

      const profilePicture = (req as any).file?.path ?? "";

      if (
        !username ||
        !phoneNumber ||
        !email ||
        !dob ||
        !gender ||
        !platform ||
        !region?.city ||
        !region?.zone ||
        !workPattern?.day ||
        !workPattern?.week
      ) {
        return sendError(res, "All fields are required", 400);
      }

      const existingDriver = await driverModel.findOne({ "personalData.phoneNumber": phoneNumber });
      if (existingDriver) return sendError(res, "Driver with this phone number already exists", 400);

      const newDriver = new driverModel({
        personalData: {
          username,
          phoneNumber,
          email,
          dob: new Date(dob),
          gender,
          profilePicture,
        },
        platformDetails: {
          platform,
          region,
          workPattern,
        },
        insurancePlan: {
          plan: insuranceId ?? "",
          initialPaymentPaid: false,
          numberOfWeeksPaid: 0,
          weeklyPayment: { amount: "0", dueDate: new Date() },
          expiryDate: new Date(),
        },
        wallet: {
          totalAmount: 0,
          transactions: { credited: [], debited: [] },
        },
      });

      await newDriver.save();
      const token = signToken(String(newDriver._id));
      return sendSuccess(res, "Driver registered successfully", { token }, 201);
    } catch (error) {
      console.error("Error in register:", error);
      return sendError(res, "Internal server error", 500);
    }
  }

  async verifyPhone(req: Request, res: Response) {
    try {
      const { phoneNumber } = req.body as { phoneNumber?: string };
      if (!phoneNumber) return sendError(res, "Phone number is required", 400);

      const existingDriver = await driverModel.findOne({ "personalData.phoneNumber": phoneNumber });
      if (!existingDriver) return sendError(res, "Driver with this phone number does not exist", 400);

      const otp = "123456";
      return sendSuccess(res, "OTP sent successfully", {
        phoneNumber,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });
    } catch (error) {
      console.error("Error in verifyPhone:", error);
      return sendError(res, "Internal server error", 500);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { phoneNumber, otp } = req.body as { phoneNumber?: string; otp?: string };
      if (!phoneNumber || !otp) return sendError(res, "Phone number and OTP are required", 400);

      const driver = await driverModel.findOne({ "personalData.phoneNumber": phoneNumber });
      if (!driver) return sendError(res, "Driver with this phone number does not exist", 400);

      if (otp !== "123456") return sendError(res, "Invalid OTP", 400);

      const token = signToken(String(driver._id));
      return sendSuccess(res, "Login successful", { token });
    } catch (error) {
      console.error("Error in login:", error);
      return sendError(res, "Internal server error", 500);
    }
  }

  async showRegions(_req: Request, res: Response) {
    try {
      const regions = await RegionsModel.find();
      return sendSuccess(res, "Regions fetched successfully", { regions });
    } catch (error) {
      console.error("Error in showRegions:", error);
      return sendError(res, "Internal server error", 500);
    }
  }

  async showPlans(_req: Request, res: Response) {
    try {
      const plans = await plansModel.find();
      return sendSuccess(res, "Plans fetched successfully", { plans });
    } catch (error) {
      console.error("Error in showPlans:", error);
      return sendError(res, "Internal server error", 500);
    }
  }

  async driverProfile(req: Request, res: Response) {
    try {
      const driver = (req as any).driver;
      if (!driver) return sendError(res, "Unauthorized", 401);
      return sendSuccess(res, "Driver profile fetched successfully", { driver });
    } catch (error) {
      console.error("Error in driverProfile:", error);
      return sendError(res, "Internal server error", 500);
    }
  }
}

export default new DriverAuthController();