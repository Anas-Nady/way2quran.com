const express = require("express");
const recitationController = require("../controllers/recitationController.js");
const upload = require("../middlewares/multerMiddleware.js");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/").get(recitationController.getAllRecitations);
router.route("/:slug").get(recitationController.getRecitation);

router.get(
  "/download/:reciterSlug/:recitationSlug",
  recitationController.downloadRecitation
);

router.use(protect, isAdmin);

router
  .route("/missing-downloadURl/:reciterSlug")
  .get(recitationController.getRecitationsMissingDownloadURL);

router
  .route("/files/audio/:reciterSlug/:recitationSlug")
  .post(upload.array("audioFiles"), recitationController.uploadAudioFiles);

router
  .route("/files/zip/:reciterSlug/:recitationSlug")
  .post(upload.single("zipFile"), recitationController.uploadZipFile);

module.exports = router;
