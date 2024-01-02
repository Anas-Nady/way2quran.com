const express = require("express");
const router = express.Router();
const surahController = require("./../controllers/surahController");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");

router
  .route("/")
  .post(protect, isAdmin, surahController.createSurah)
  .get(surahController.getAllSurahs)
  .delete(protect, isAdmin, surahController.deleteAllSurahs);

module.exports = router;
