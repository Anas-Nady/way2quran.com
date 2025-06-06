import express from "express";
import restartServer from "../utils/restartServer";
import { isAdmin, protect } from "../middlewares/authMiddleware";
const router = express.Router();

router.route("/").post(protect, isAdmin, restartServer);

export default router;
