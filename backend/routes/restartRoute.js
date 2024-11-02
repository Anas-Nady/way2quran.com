const express = require("express");
const restartServer = require("../utils/restartServer");
const router = express.Router();

router.route("/").post(restartServer);

module.exports = router;
