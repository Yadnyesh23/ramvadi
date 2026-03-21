import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import verifyAdmin from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyAdmin, getDashboardStats);

export default router;