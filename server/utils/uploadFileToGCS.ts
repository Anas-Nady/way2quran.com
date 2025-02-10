import fs from "fs";
import { bucketName, cloudBaseUrl, storage } from "../config/googleStorage";
import AppError from "./appError";

interface FileToUpload {
  originalname: string;
  path: string;
  mimetype: string;
}

interface uploadFileToGCSProps {
  fileToUpload: FileToUpload;
  folderName: string;
  fileName: string;
}

const uploadFileToGCS = async ({
  fileToUpload,
  folderName,
  fileName,
}: uploadFileToGCSProps): Promise<{
  publicURL: string;
  downloadURL: string;
} | void> => {
  const fileExtension = fileToUpload.originalname.split(".").pop();
  const filePath = `${folderName}/${fileName}.${fileExtension}`;
  const file = storage.bucket(bucketName).file(filePath);

  try {
    const readableStream = fs.createReadStream(fileToUpload.path);
    await new Promise<void>((resolve, reject) => {
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
        .on("finish", () => resolve());
    });

    // Delete the temporary file after upload
    fs.unlink(fileToUpload.path, (err) => {
      if (err) {
        console.error("Failed to delete temporary file:", err);
      }
    });

    return {
      publicURL: `${cloudBaseUrl}/${bucketName}/${filePath}`,
      downloadURL: file.metadata.mediaLink as string,
    };
  } catch (error: any) {
    fs.unlink(fileToUpload.path, (err) => {
      if (err) {
        console.error("Failed to delete temporary file:", err);
      }
    });
    throw new AppError(
      `Failed to upload file to Google Cloud Storage: ${error.message}`,
      error.status
    );
  }
};

export default uploadFileToGCS;
