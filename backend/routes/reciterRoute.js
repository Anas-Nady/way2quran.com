const express = require("express");
const reciterController = require("./../controllers/reciterController");
const upload = require("./../middlewares/multerMiddleware");

const router = express.Router();

router
  .route("/")
  .get(reciterController.getAllReciters)
  .post(upload.single("photo"), reciterController.createReciter);

router
  .route("/upload-recitation/:id")
  .put(upload.array("audioFiles"), reciterController.uploadRecitations);

router
  .route("/:slug")
  .get(reciterController.getReciter)
  // .put(reciterController.updateReciter)
  .delete(reciterController.deleteReciter);

router.route("/:recitationType/:slug").get(reciterController.getReciterProfile);

module.exports = router;
