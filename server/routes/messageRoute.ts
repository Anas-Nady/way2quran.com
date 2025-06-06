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
import createRateLimiter from "../utils/rateLimiter";

const loginLimiter = createRateLimiter({
  windowMinutes: 10 * 60, // 10 hours
  maxRequests: 10,
});

router
  .route("/")
  .post(loginLimiter, createMessage)
  .get(protect, isAdmin, listAllMessages);

router.use(protect, isAdmin);

router.route("/unread").get(getUnreadMessages);
router.route("/send-message").post(sendMessage);
router.route("/:slug").delete(deleteMessage);

export default router;
