const path = require("path");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config({ path: "./../.env.local" });

// Initialize Google Cloud Storage
const keyFilePath = path.join(__dirname, "../../cloud-configuration.json");

const storage = new Storage({
  keyFilename: keyFilePath,
});
const bucketName = process.env.BUCKET_NAME;
const defaultPhotoPath = "imgs/small-logo.svg";
const cloudBaseUrl = "https://storage.googleapis.com";

module.exports = { storage, bucketName, defaultPhotoPath, cloudBaseUrl };
