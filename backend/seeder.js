const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const projectId = "";
const bucketName = "waytoquran_storage";

const storage = new Storage({
  keyFilename: `${__dirname}/../way2quran-050506e0ded3.json`,
});

async function downloadFile() {
  const filePath = "Asharf-zaky/hafs-an-asim";
  const localFilePath = path.join(__dirname, "downloaded_file");

  try {
    // Download the file
    const file = await storage.bucket(bucketName).file(filePath);
    let result = file.download();
    console.log(result);
    return result;
  } catch (err) {
    console.error(`Error downloading file ${filePath}:`, err.message);
    // Handle the error appropriately, e.g., log it or return an error response.
  }
}

downloadFile();
