// routes/visitorRoutes.js
const express = require("express");
const {
  getVisitorCount,
  logVisitorTracking,
} = require("./../controllers/visitorController.js");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1,
  trustProxy: true,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

const router = express.Router();

router.get("/count", getVisitorCount);

module.exports = router;
