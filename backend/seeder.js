const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const bucketName = "waytoquran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

// const photo = path.join(__dirname, "/public/default-logo.svg");
// console.log(photo);

// async function saveFolderNamesToFile() {
//   try {
//     const folderNames = await getFolderNames();

//     const jsonData = JSON.stringify(folderNames, null, 2);

//     fs.writeFileSync("folderNames.json", jsonData);

//     console.log("Folder names saved to file successfully.");
//   } catch (err) {
//     console.error("Error saving folder names to file:", err);
//   }
// }

// saveFolderNamesToFile();
