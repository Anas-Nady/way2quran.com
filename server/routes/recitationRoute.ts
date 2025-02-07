import express from "express";
import {
  getAllRecitations,
  getRecitation,
  downloadRecitation,
  getRecitationsMissingDownloadURL,
  uploadAudioFiles,
  uploadZipFile,
} from "../controllers/recitationController";
import upload from "../middlewares/multerMiddleware";
import { protect, isAdmin } from "../middlewares/authMiddleware";
const router = express.Router();

router.route("/").get(getAllRecitations);
router.route("/:slug").get(getRecitation);

router.get("/download/:reciterSlug/:recitationSlug", downloadRecitation);

router.use(protect, isAdmin);

router
  .route("/missing-downloadURl/:reciterSlug")
  .get(getRecitationsMissingDownloadURL);

router
  .route("/files/audio/:reciterSlug/:recitationSlug")
  .post(upload.array("audioFiles"), uploadAudioFiles);

router
  .route("/files/zip/:reciterSlug/:recitationSlug")
  .post(upload.single("zipFile"), uploadZipFile);

export default router;
