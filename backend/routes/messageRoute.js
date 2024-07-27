const express = require("express");
const router = express.Router();
const messageController = require("./../controllers/messageController.js");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 60 * 1000,
  max: 3,
  trustProxy: true,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

router
  .route("/")
  .post(limiter, messageController.createMessage)
  .get(protect, isAdmin, messageController.listAllMessages);

router
  .route("/unread")
  .get(protect, isAdmin, messageController.getUnreadMessages);

router
  .route("/:slug")
  .delete(protect, isAdmin, messageController.deleteMessage);

module.exports = router;
