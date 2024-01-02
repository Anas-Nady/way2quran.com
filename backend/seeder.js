const { Storage } = require("@google-cloud/storage");
const Reciter = require("./models/reciterModel.js");
const path = require("path");
const fs = require("fs");

const bucketName = "way2quran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

const reciters = require("./public/reciters.js");

// const photo = path.join(__dirname, "/public/full-logo.svg");
// console.log(photo);

// async function uploadPhoto() {
//   try {
//     const fileName = "imgs/full-logo.svg";

//     await storage.bucket(bucketName).upload(photo, {
//       destination: fileName,
//       public: true,
//       resumable: false,
//     });

//     const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

//     console.log(publicUrl);
//   } catch (err) {
//     console.log(err);
//   }
// }

// uploadPhoto();

// async function getParentFolderNames() {
//   const [files] = await storage
//     .bucket(oldBucket)
//     .getFiles({ prefix: "al-ashri-omaran" });

//   const parentFolderNamesSet = new Set();

//   files.forEach((file) => {
//     // Extract the parent folder name from the file path

//     // Add the parent folder name to the set
//     parentFolderNamesSet.add(file.name);
//     console.log(parentFolderNamesSet);
//   });

//   // Convert the set of folder names to an array
//   return Array.from(parentFolderNamesSet);
// }

// async function saveFolderNamesToFile() {
//   try {
//     const folderNames = await getParentFolderNames();

//     const jsonData = JSON.stringify(folderNames, null, 2);

//     await fs.writeFile("folderNames.json", jsonData);

//     console.log("Parent folder names saved to file successfully.");
//   } catch (err) {
//     console.error("Error saving parent folder names to file:", err);
//   }
// }

// // saveFolderNamesToFile();
// saveFolderNamesToFile();

async function handleUploadReciters() {
  try {
    for (let i = 0; i < reciters.length; i++) {
      const [files] = await storage
        .bucket(bucketName)
        .getFiles({ prefix: reciters[i].slug });

      const name = reciters[i].name;
      const name_ar = reciters[i].name_ar;
      const photo =
        "https://storage.googleapis.com/way2quran_storage/imgs/reciter-default-photo.svg";

      const recitations = {
        slug: "hafs-an-asim",
        audioFiles: [],
        isCompleted: false,
      };

      for (const file of files) {
        recitations.audioFiles.push({
          surah: file.name.match(/\d+/)[0],
          audioFile: `https://storage.googleapis.com/way2quran_storage/${file.name}`,
          downloadUrl: file.metadata.mediaLink,
        });
        console.log(recitations.audioFiles);
      }

      if (recitations.audioFiles.length === 114) {
        recitations.isCompleted = true;
      }

      await Reciter.create({ name, name_ar, photo, recitations });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = handleUploadReciters;
