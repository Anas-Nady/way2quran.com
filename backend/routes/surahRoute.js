const express = require("express");
const router = express.Router();
const surahController = require("./../controllers/surahController");

router
  .route("/")
  .post(surahController.createSurah)
  .get(surahController.getAllSurahs)
  .delete(surahController.deleteAllSurahs);

router.get("/:id", surahController.getSurah);

module.exports = router;
