const express = require("express");
const {
  incrementDownloadCount,
  getAllDownloadCounts,
} = require("../controllers/quranDownloadController.js");

const router = express.Router();

router.get("/", getAllDownloadCounts);
router.post("/increment/:slug", incrementDownloadCount);

module.exports = router;
