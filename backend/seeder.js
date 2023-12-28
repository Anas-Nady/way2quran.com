const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const projectId = "";
const bucketName = "waytoquran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

const photo = path.join(__dirname, "/public/default-logo.svg");
console.log(photo);

async function uploadPhoto() {
  try {
    const filePath = "imgs/default-reciter-photo.svg";

    // Download the file
    await storage.bucket(bucketName).upload(photo, {
      destination: filePath,
      public: true,
    });

    console.log("photo uploaded successfully");
  } catch (err) {
    console.log(err);
    // Handle the error appropriately, e.g., log it or return an error response.
  }
}

// uploadPhoto();
