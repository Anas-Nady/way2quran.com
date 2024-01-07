const { Storage } = require("@google-cloud/storage");
const Reciter = require("./models/reciterModel.js");
const path = require("path");
const fs = require("fs");

const bucketName = "way2quran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

// const photo = path.join(__dirname, "/public/way2quran-icon.svg");
// const photoName = photo.split("public/")[1];
// console.log(photoName);

async function uploadPhoto() {
  try {
    const fileName = `imgs/${photoName}`;
    await storage.bucket(bucketName).upload(photo, {
      destination: fileName,
      public: true,
      resumable: false,
    });
  } catch (err) {
    console.log(err);
  }
}

// uploadPhoto();
