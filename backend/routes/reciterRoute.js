const express = require("express");
const reciterController = require("./../controllers/reciterController");
const upload = require("./../middlewares/multerMiddleware");
const { protect, isAdmin } = require("./../middlewares/authMiddleware.js");

const router = express.Router();

router
  .route("/")
  .get(reciterController.getAllReciters)
  .post(
    protect,
    isAdmin,
    upload.single("photo"),
    reciterController.createReciter
  );

router.get(
  "/download/:reciterSlug/:recitationSlug",
  reciterController.downloadRecitation
);

router
  .route("/upload-recitation/:slug")
  .put(
    protect,
    isAdmin,
    upload.array("audioFiles"),
    reciterController.uploadRecitations
  );

router
  .route("/:slug")
  .get(reciterController.getReciter)
  .put(
    protect,
    isAdmin,
    upload.single("photo"),
    reciterController.updateReciter
  )
  .delete(protect, isAdmin, reciterController.deleteReciter);

router
  .route("/:reciter-profile/:slug")
  .get(reciterController.getReciterProfile);

router
  .route("/delete-surah/:reciterSlug/:recitationSlug/:surahSlug")
  .delete(protect, isAdmin, reciterController.deleteReciterSurah);

router
  .route("/delete-recitation/:reciterSlug/:recitationSlug")
  .delete(protect, isAdmin, reciterController.deleteReciterRecitation);

module.exports = router;
