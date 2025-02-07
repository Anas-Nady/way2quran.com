import express from "express";
const router = express.Router();
import {
  createMessage,
  listAllMessages,
  getUnreadMessages,
  sendMessage,
  deleteMessage,
} from "../controllers/messageController";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 60 * 1000,
  max: 10,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

router
  .route("/")
  .post(limiter, createMessage)
  .get(protect, isAdmin, listAllMessages);

router.use(protect, isAdmin);

router.route("/unread").get(getUnreadMessages);
router.route("/send-message").post(sendMessage);
router.route("/:slug").delete(deleteMessage);

export default router;
