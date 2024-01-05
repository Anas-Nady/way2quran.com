const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/login").post(authController.login);
// router.route("/register").post(authController.register);
router.route("/logout").get(authController.logout);

router.use(protect, isAdmin);

router.route("/update-profile").put(userController.updateProfile);
router.route("/get-profile").get(userController.getProfile);

module.exports = router;
