import type { Request, Response } from "express";
import PlanModel from "../models/plans.model.js";
import RegionsModel from "../models/regions.model.js";
import { sendError, sendSuccess } from "../middleware/responseHandler.js";

class InitializationController {
  async createPlan(req: Request, res: Response) {
    try {
      const { name, initialPayment, weeklyPayment, durationInWeeks, score, expiryTimePeriod } = req.body as {
        name?: string;
        initialPayment?: string;
        weeklyPayment?: string;
        durationInWeeks?: number;
        score?: number;
        expiryTimePeriod?: string;
      };

      if (
        !name ||
        !initialPayment ||
        !weeklyPayment ||
        durationInWeeks === undefined ||
        score === undefined ||
        !expiryTimePeriod
      ) {
        return sendError(res, "All fields are required", 400);
      }

      const plan = await PlanModel.create({
        name,
        initialPayment,
        weeklyPayment,
        durationInWeeks,
        score,
        expiryTimePeriod,
      });

      return sendSuccess(res, "Plan created successfully", { plan }, 201);
    } catch (error) {
      console.error("Error in createPlan:", error);
      return sendError(res, "Internal server error", 500);
    }
  }

  async createRegion(req: Request, res: Response) {
    try {
      const { city, zone } = req.body as { city?: string; zone?: string };
      if (!city || !zone) return sendError(res, "City and zone are required", 400);

      const existing = await RegionsModel.findOne({ city });
      if (existing) {
        if (!existing.zones.includes(zone)) existing.zones.push(zone);
        await existing.save();
        return sendSuccess(res, "Region updated successfully", { region: existing });
      }

      const region = await RegionsModel.create({ city, zones: [zone] });
      return sendSuccess(res, "Region created successfully", { region }, 201);
    } catch (error) {
      console.error("Error in createRegion:", error);
      return sendError(res, "Internal server error", 500);
    }
  }
}

export default new InitializationController();

