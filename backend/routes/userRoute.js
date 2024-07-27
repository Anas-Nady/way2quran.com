const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 60 * 1000, // 5 hours
  max: 25,
  trustProxy: true,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  },
});

router.route("/login").post(limiter, authController.login);
// router.route("/register").post(authController.register);
router.route("/logout").get(authController.logout);

router.use(protect, isAdmin);

router.route("/update-profile").put(userController.updateProfile);
router.route("/get-profile").get(userController.getProfile);

module.exports = router;
