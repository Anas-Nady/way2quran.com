const { Storage } = require("@google-cloud/storage");
const Reciter = require("./models/reciterModel.js");
const path = require("path");
const fs = require("fs");

const bucketName = "way2quran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

// const photo = path.join(__dirname, "/public/last-one.png");

async function uploadPhoto() {
  try {
    const fileName = "imgs";

    // Get the file from the bucket
    const files = storage.bucket(bucketName).file(fileName);

    // Download the file using the file stream
    for (const file of files) {
      file
        .createReadStream()
        .on("error", (err) => {
          console.error(`Error downloading file: ${err.message}`);
        })
        .on("error", (err) => {
          console.error(`Error writing file to local storage: ${err.message}`);
        })
        .on("finish", () => {
          console.log("File downloaded successfully");
        });
    }
  } catch (err) {
    console.log(err);
  }
}

uploadPhoto();
