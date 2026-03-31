import { Router } from "express";
import multer from "multer";
import driverAuthController from "../controllers/driverAuth.controller.js";
import driverAuthMiddleware from "../middleware/driverAuth.js";


const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("profilePicture"), (req, res) => driverAuthController.register(req, res));
router.post("/login", (req, res) => driverAuthController.login(req, res));
router.post("/verifyphone", (req, res) => driverAuthController.verifyPhone(req, res));

router.get("/showRegions", (req, res) => driverAuthController.showRegions(req, res));
router.get("/showPlans", (req, res) => driverAuthController.showPlans(req, res));

router.get("/driverProfile", driverAuthMiddleware, (req, res) => driverAuthController.driverProfile(req, res));

export default router;