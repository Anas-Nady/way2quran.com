const express = require("express");
const router = express.Router();
const surahController = require("./../controllers/surahController");
// const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");

router.route("/").get(surahController.getAllSurahs);
// .post(protect, isAdmin, surahController.createSurah)
// .delete(protect, isAdmin, surahController.deleteAllSurahs);

module.exports = router;
