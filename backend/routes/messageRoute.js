const express = require("express");
const router = express.Router();
const messageController = require("./../controllers/messageController.js");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");

router
  .route("/")
  .post(messageController.createMessage)
  .get(protect, isAdmin, messageController.listAllMessages);

router.use(protect, isAdmin);

router
  .route("/:slug")
  .get(messageController.getMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
