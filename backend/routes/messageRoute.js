const express = require("express");
const router = express.Router();
const messageController = require("./../controllers/messageController.js");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");

router
  .route("/")
  .get(protect, isAdmin, messageController.listAllMessages)
  .post(messageController.createMessage);

router
  .route("/:slug")
  .get(protect, isAdmin, messageController.getMessage)
  .delete(protect, isAdmin, messageController.deleteMessage);

module.exports = router;
