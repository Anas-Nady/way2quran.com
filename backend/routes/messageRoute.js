const express = require("express");
const router = express.Router();
const messageController = require("./../controllers/messageController.js");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 60 * 1000,
  max: 10,
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

router.use(protect, isAdmin);

router.route("/unread").get(messageController.getUnreadMessages);
router.route("/send-message").post(messageController.sendMessage);
router.route("/:slug").delete(messageController.deleteMessage);

module.exports = router;
