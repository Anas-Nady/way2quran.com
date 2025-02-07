const fs = require("fs");
const {
  bucketName,
  cloudBaseUrl,
  storage,
} = require("../config/googleStorage");
const AppError = require("./appError");

const uploadFileToGCS = async ({ fileToUpload, folderName, fileName }) => {
  const fileExtension = fileToUpload.originalname.split(".").pop();
  const filePath = `${folderName}/${fileName}.${fileExtension}`;
  const file = storage.bucket(bucketName).file(filePath);

  try {
    const readableStream = fs.createReadStream(fileToUpload.path);
    await new Promise((resolve, reject) => {
      readableStream
        .pipe(
          file.createWriteStream({
            metadata: {
              contentType: fileToUpload.mimetype,
            },
            public: true,
            resumable: true,
          })
        )
        .on("error", (error) => reject(error))
        .on("finish", () => resolve(null));
    });

    // Delete the temporary file after upload
    fs.unlink(fileToUpload.path, (err) => {
      if (err) {
        console.error("Failed to delete temporary file:", err);
      }
    });

    return {
      publicURL: `${cloudBaseUrl}/${bucketName}/${fileName}`,
      downloadURL: file.metadata.mediaLink,
    };
  } catch (error) {
    fs.unlink(fileToUpload.path, (err) => {
      if (err) {
        console.error("Failed to delete temporary file:", err);
      }
    });
    return next(
      new AppError(
        `Failed to upload file to Google Cloud Storage: ${error.message}`
      )
    );
  }
};

module.exports = uploadFileToGCS;
