const express = require("express");
const frequentRecitationController = require("../controllers/frequentRecitationController.js");

const router = express.Router();

router
  .route("/")
  .get(frequentRecitationController.getAllFrequentRecitations)
  .post(frequentRecitationController.createFrequentRecitation);

router.route("/:id").get(frequentRecitationController.getFrequentRecitation);

module.exports = router;
