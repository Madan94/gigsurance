import { Router } from "express";
import initializationController from "../controllers/intialization.controller.js";

const router = Router();

/*
Create Plan
curl -X POST 'http://localhost:8080/api/init/plans' \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"Standard",
    "initialPayment":"199",
    "weeklyPayment":"49",
    "durationInWeeks":4,
    "score":0.8,
    "expiryTimePeriod":"4"
  }'
*/
router.post("/plans", (req, res) => initializationController.createPlan(req, res));

/*
Create/Update Region (adds zone to existing city if missing)
curl -X POST 'http://localhost:5050/api/init/regions' \
  -H 'Content-Type: application/json' \
  -d '{
    "city":"chennai",
    "zone":"ambattur"
  }'
*/
router.post("/regions", (req, res) => initializationController.createRegion(req, res));

export default router;