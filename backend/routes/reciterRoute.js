const express = require("express");
const reciterController = require("./../controllers/reciterController");
const upload = require("./../middlewares/multerMiddleware");

const router = express.Router();

router
  .route("/")
  .get(reciterController.getAllReciters)
  .post(upload.single("photo"), reciterController.createReciter);

router.get("/download", reciterController.downloadRecitation);

// router.get("/preview-reciter/:slug", reciterController.getPreviewReciter);

router
  .route("/upload-recitation/:slug")
  .put(upload.array("audioFiles"), reciterController.uploadRecitations);

router
  .route("/:slug")
  .get(reciterController.getReciter)
  .put(upload.single("photo"), reciterController.updateReciter)
  .delete(reciterController.deleteReciter);

router
  .route("/:reciter-profile/:slug")
  .get(reciterController.getReciterProfile);

module.exports = router;
