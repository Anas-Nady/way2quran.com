// routes/visitorRoutes.js
const express = require("express");
const { getVisitorCount } = require("./../controllers/visitorController.js");

const router = express.Router();

// Route for getting visitor counts based on the range
router.get("/count/:range(today|weekly|monthly|yearly|total)", getVisitorCount);

module.exports = router;
