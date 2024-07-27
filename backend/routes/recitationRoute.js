const express = require("express");
const recitationController = require("../controllers/recitationController.js");
const router = express.Router();

router.route("/").get(recitationController.getAllRecitations);
router.route("/:slug").get(recitationController.getRecitation);

module.exports = router;
