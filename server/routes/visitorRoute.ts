import express from "express";
import {
  getVisitorCount,
  logVisitorTracking,
} from "../controllers/visitorController";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  max: 1,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

const router = express.Router();

router.get("/count", getVisitorCount);
router.post("/track", limiter, logVisitorTracking);

export default router;
