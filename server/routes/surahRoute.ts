import express from "express";
const router = express.Router();
import { getAllSurahs, getSurahInfo } from "../controllers/surahController";

router.route("/").get(getAllSurahs);

router.route("/:slug").get(getSurahInfo);

export default router;
