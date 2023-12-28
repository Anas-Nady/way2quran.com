const path = require("path");
const { Storage } = require("@google-cloud/storage");

// Initialize Google Cloud Storage
const keyFilePath = path.join(__dirname, "../../cloud-configuration.json");

const storage = new Storage({
  keyFilename: keyFilePath,
});
const bucketName = process.env.BUCKET_NAME;

module.exports = { storage, bucketName };
