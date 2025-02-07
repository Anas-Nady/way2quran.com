import path from "path";
import { Storage } from "@google-cloud/storage";
require("dotenv").config({ path: "./../.env.local" });

// Initialize Google Cloud Storage
export const keyFilePath = path.join(
  __dirname,
  "../../cloud-configuration.json"
);

export const storage = new Storage({
  keyFilename: keyFilePath,
});
export const bucketName = process.env.BUCKET_NAME as string;
export const defaultPhotoPath = "imgs/small-logo.png";
export const cloudBaseUrl = "https://storage.googleapis.com";
