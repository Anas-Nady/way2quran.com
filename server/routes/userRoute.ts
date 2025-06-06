import express from "express";
import { login, logout } from "../controllers/authController";
import { updateProfile, getProfile } from "../controllers/userController";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import createRateLimiter from "../utils/rateLimiter";

const router = express.Router();

const loginLimiter = createRateLimiter({
  windowMinutes: 5 * 60, // 5 hours
  maxRequests: 25,
});

router.route("/login").post(loginLimiter, login);
// router.route("/register").post(register);
router.route("/logout").get(logout);

router.use(protect, isAdmin);

router.route("/update-profile").put(updateProfile);
router.route("/get-profile").get(getProfile);

export default router;
