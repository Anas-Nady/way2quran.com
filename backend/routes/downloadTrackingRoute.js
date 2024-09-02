const express = require("express");
const {
  trackQuranDownload,
  getQuranDownloadCounts,
} = require("../controllers/downloadTrackingController.js");

const router = express.Router();

// Route to track and serve PDF downloads
router.get("/quran/:pdfName", trackQuranDownload);

router.get("/counts", getQuranDownloadCounts);

module.exports = router;
