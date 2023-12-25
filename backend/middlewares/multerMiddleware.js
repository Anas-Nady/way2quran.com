const multer = require("multer");

const storage = multer.memoryStorage();
upload = multer({ storage });

module.exports = upload;
