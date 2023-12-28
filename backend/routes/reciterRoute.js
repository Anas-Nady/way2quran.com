const express = require("express");
const reciterController = require("./../controllers/reciterController");
const upload = require("./../middlewares/multerMiddleware");

const router = express.Router();

router
  .route("/")
  .get(reciterController.getAllReciters)
  .post(upload.single("photo"), reciterController.createReciter);

router.get("/preview-reciter/:slug", reciterController.getPreviewReciter);

router
  .route("/upload-recitation/:slug")
  .put(upload.array("audioFiles"), reciterController.uploadRecitations);

router
  .route("/:slug")
  .get(reciterController.getReciter)
  .put(upload.single("photo"), reciterController.updateReciter)
  .delete(reciterController.deleteReciter);

router.route("/:recitationType/:slug").get(reciterController.getReciterProfile);

router
  .route("/download-recitation/:slug")
  .post(reciterController.downloadRecitation);

module.exports = router;
