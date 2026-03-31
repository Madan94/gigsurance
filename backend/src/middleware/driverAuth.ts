import { NextFunction } from "express";
import driverModel from "../models/driver.model.js";
import jwt from "jsonwebtoken";
import { sendError } from "./responseHandler.js";

export const driverAuthMiddleware = async (req: any, res: any, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendError(res, "Unauthorized", 401);
        }

        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const driverId = decoded.id;

        const driver = await driverModel.findById(driverId);
        if (!driver) {
            return sendError(res, "Unauthorized", 401);
        }

        req.driver = driver;
        req.driverId = driverId;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return sendError(res, "Unauthorized", 401);
    }
}

export default driverAuthMiddleware;