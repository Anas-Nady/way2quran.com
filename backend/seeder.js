const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs").promises;

const oldBucket = "waytoquran_storage";
const newBucket = "way2quran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../cloud-configuration.json`,
});

// const photo = path.join(__dirname, "/public/default-logo.svg");
// console.log(photo);

// const prefixArray = [
// "saeed-bin-abdullah-al-abdullah",
// "HAMAZA-AL-FAR",
// "abdel-basit-abdel-samad-(recited-qur’an)",
// "abdul-basit-abdul-samad-(tajweed)",
// "ِal-ashri-omaran",
// ];

// async function cleanData() {
//   for (const prefix of prefixArray) {
//     const [files] = await storage
//       .bucket(oldBucket)
//       .getFiles({ prefix: prefix });

//     for (const file of files) {
//       const fileNameParts = file.name.split("/");
//       const newFileName = `${prefix}/hafs-an-asim/${fileNameParts[1]}`;

//       await storage
//         .bucket(oldBucket)
//         .file(file.name)
//         .copy(storage.bucket(newBucket).file(newFileName));
//       console.log(
//         `File ${file.name} copied to ${newBucket} as ${newFileName}.`
//       );

//       await storage.bucket(oldBucket).file(file.name).delete();
//       console.log(`File ${file.name} deleted from ${oldBucket}.`);
//     }
//   }
// }

// cleanData();

async function getParentFolderNames() {
  const [files] = await storage.bucket(newBucket).getFiles();

  const parentFolderNamesSet = new Set();

  files.forEach((file) => {
    // Extract the parent folder name from the file path
    const parentFolderName = file.name.split("/").slice(0, -1).join("/");

    // Add the parent folder name to the set
    parentFolderNamesSet.add(parentFolderName);
    console.log(parentFolderNamesSet);
  });

  // Convert the set of folder names to an array
  return Array.from(parentFolderNamesSet);
}

async function saveFolderNamesToFile() {
  try {
    const folderNames = await getParentFolderNames();

    const jsonData = JSON.stringify(folderNames, null, 2);

    await fs.writeFile("folderNames.json", jsonData);

    console.log("Parent folder names saved to file successfully.");
  } catch (err) {
    console.error("Error saving parent folder names to file:", err);
  }
}

// saveFolderNamesToFile();
saveFolderNamesToFile();

// badr-al-turki/hafs-an-asim
