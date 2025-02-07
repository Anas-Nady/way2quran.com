import express from "express";
import { globalSearch } from "../controllers/searchController";
const router = express.Router();

router.route("/").get(globalSearch);

export default router;
