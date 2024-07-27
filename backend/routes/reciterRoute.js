const express = require("express");
const reciterController = require("../controllers/reciterController.js");
const upload = require("../middlewares/multerMiddleware.js");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");

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
  "/download-recitation/:reciterSlug/:recitationSlug",
  reciterController.downloadRecitation
);

router
  .route("/upload-recitation/:reciterSlug/:recitationSlug")
  .put(
    protect,
    isAdmin,
    upload.array("audioFiles"),
    reciterController.uploadRecitations
  );

router
  .route("/:slug")
  .get(reciterController.getReciterInfo)
  .put(
    protect,
    isAdmin,
    upload.single("photo"),
    reciterController.updateReciter
  )
  .delete(protect, isAdmin, reciterController.deleteReciter);

router
  .route("/:reciter-profile/:reciterSlug")
  .get(reciterController.getReciterDetails);

router
  .route("/delete-surah/:reciterSlug/:recitationSlug/:surahSlug")
  .delete(protect, isAdmin, reciterController.deleteSurah);

router
  .route("/delete-recitation/:reciterSlug/:recitationSlug")
  .delete(protect, isAdmin, reciterController.deleteRecitation);

module.exports = router;
