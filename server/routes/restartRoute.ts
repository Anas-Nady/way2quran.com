import express from "express";
import restartServer from "../utils/restartServer";
const router = express.Router();

router.route("/").post(restartServer);

export default router;
