import express from "express";
import {
  incrementDownloadCount,
  getAllDownloadCounts,
} from "../controllers/mushafController";

const router = express.Router();

router.get("/", getAllDownloadCounts);
router.post("/increment/:slug", incrementDownloadCount);

export default router;
