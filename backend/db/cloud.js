const path = require("path");
const { Storage } = require("@google-cloud/storage");

// Initialize Google Cloud Storage
const keyFilePath = path.join(__dirname, "../../cloud-configuration.json");

const storage = new Storage({
  keyFilename: keyFilePath,
});
const bucketName = process.env.BUCKET_NAME;
const defaultPhotoPath = "imgs/reciter-default-photo.svg";
const cloudBaseUrl = "https://storage.googleapis.com";

module.exports = { storage, bucketName, defaultPhotoPath, cloudBaseUrl };
