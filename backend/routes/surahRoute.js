const express = require("express");
const router = express.Router();
const surahController = require("./../controllers/surahController");

router.route("/").get(surahController.getAllSurahs);

router.route("/:slug").get(surahController.getSurahInfo);

module.exports = router;
