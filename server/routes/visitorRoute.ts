import express from "express";
import {
  getVisitorCount,
  logVisitorTracking,
} from "../controllers/visitorController";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import createRateLimiter from "../utils/rateLimiter";

const loginLimiter = createRateLimiter({
  windowMinutes: 60, // 1 hour
  maxRequests: 1,
});

const router = express.Router();

router.use(protect, isAdmin);

router.get("/count", getVisitorCount);
router.post("/track", loginLimiter, logVisitorTracking);

export default router;
