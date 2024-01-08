const express = require("express");
const recitationController = require("../controllers/recitationController.js");

const router = express.Router();

router
  .route("/")
  .get(recitationController.getAllRecitations)
  .post(recitationController.createRecitation);

router.route("/:id").get(recitationController.getRecitation);

module.exports = router;
