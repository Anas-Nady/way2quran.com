const express = require("express");
const router = express.Router();
const messageController = require("./../controllers/messageController.js");

router
  .route("/")
  .get(messageController.listAllMessages)
  .post(messageController.createMessage);

router
  .route("/:slug")
  .get(messageController.getMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
