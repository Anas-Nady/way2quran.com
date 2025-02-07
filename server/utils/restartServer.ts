import { Request, Response, NextFunction } from "express";
import { exec } from "child_process";
import asyncHandler from "express-async-handler";

const restartServer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      exec("pm2 restart backend-server", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error restarting server: ${stderr}`);
          return res
            .status(500)
            .json({ message: "Server restart failed", error });
        }

        return res
          .status(200)
          .json({ message: "Server restarted successfully" });
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export default restartServer;
