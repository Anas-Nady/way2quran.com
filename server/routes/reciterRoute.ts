import express from "express";
import {
  getAllReciters,
  createReciter,
  getReciterDetails,
  getRecitersMissingRecitations,
  getReciterInfo,
  deleteRecitation,
  deleteReciter,
  updateReciter,
  deleteSurah,
} from "../controllers/reciterController";
import upload from "../middlewares/multerMiddleware";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import cacheMiddleware from "../middlewares/cacheMiddleware";

const router = express.Router();

router
  .route("/")
  .get(getAllReciters)
  .post(protect, isAdmin, upload.single("photo"), createReciter);

router
  .route("/missing-recitation-downloadURl")
  .get(protect, isAdmin, getRecitersMissingRecitations);

router
  .route("/:slug")
  .get(getReciterInfo)
  .put(protect, isAdmin, upload.single("photo"), updateReciter)
  .delete(protect, isAdmin, deleteReciter);

router
  .route("/:reciter-profile/:reciterSlug")
  .get(cacheMiddleware, getReciterDetails);

router
  .route("/delete-surah/:reciterSlug/:recitationSlug/:surahSlug/:audioName")
  .delete(protect, isAdmin, deleteSurah);

router
  .route("/delete-recitation/:reciterSlug/:recitationSlug")
  .delete(protect, isAdmin, deleteRecitation);

export default router;
