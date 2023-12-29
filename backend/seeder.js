const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const bucketName = "waytoquran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

// const photo = path.join(__dirname, "/public/default-logo.svg");
// console.log(photo);

async function getFolderNames() {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();

    const folderNames = new Set();

    files.forEach((file) => {
      const parts = file.name.split("/");
      if (parts.length > 1) {
        // If the file has a path, consider it as part of a folder
        folderNames.add(parts[0]);
      }
    });

    // Convert Set to an array
    const folderArray = Array.from(folderNames);

    return folderArray;
  } catch (err) {
    console.error("Error getting folder names:", err);
    throw err;
  }
}

async function saveFolderNamesToFile() {
  try {
    const folderNames = await getFolderNames();

    const jsonData = JSON.stringify(folderNames, null, 2);

    fs.writeFileSync("folderNames.json", jsonData);

    console.log("Folder names saved to file successfully.");
  } catch (err) {
    console.error("Error saving folder names to file:", err);
  }
}

saveFolderNamesToFile();
