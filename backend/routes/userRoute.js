const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const authMiddleware = require("./../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/logout").get(authController.logout);

router
  .route("/update-profile")
  .put(
    authMiddleware.protect,
    authMiddleware.isAdmin,
    userController.updateProfile
  );

router
  .route("/get-profile")
  .get(
    authMiddleware.protect,
    authMiddleware.isAdmin,
    userController.getProfile
  );

module.exports = router;
