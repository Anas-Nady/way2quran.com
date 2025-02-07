import express from "express";
import { login, logout } from "../controllers/authController";
import { updateProfile, getProfile } from "../controllers/userController";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import rateLimit from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 60 * 1000, // 5 hours
  max: 25,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

router.route("/login").post(limiter, login);
// router.route("/register").post(register);
router.route("/logout").get(logout);

router.use(protect, isAdmin);

router.route("/update-profile").put(updateProfile);
router.route("/get-profile").get(getProfile);

export default router;
