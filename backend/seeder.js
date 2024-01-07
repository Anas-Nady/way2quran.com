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
    // const fileName = "imgs/social-media-logo.jpg";
    // await storage.bucket(bucketName).upload(photo, {
    //   destination: fileName,
    //   public: true,
    //   resumable: false,
    // });
    // const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    // console.log(publicUrl);
  } catch (err) {
    console.log(err);
  }
}

uploadPhoto();
