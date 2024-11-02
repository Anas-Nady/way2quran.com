const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");

const restartServer = asyncHandler(async (req, res, next) => {
  try {
    exec("pm2 restart backend-server", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting server: ${stderr}`);
        return res
          .status(500)
          .json({ message: "Server restart failed", error });
      }

      return res.status(200).json({ message: "Server restarted successfully" });
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = restartServer;
