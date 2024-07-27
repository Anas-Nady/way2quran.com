const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024 * 1024, // 3 gigabyte in bytes
  },
});

module.exports = upload;
