import { bucketName, storage } from "../config/googleStorage";
import AppError from "./appError";

export const deleteFilesFromGCS = async (prefix: string) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles({ prefix });

    if (files.length) {
      await Promise.all(
        files.map(async (file) => {
          try {
            const [exists] = await file.exists();
            if (exists) {
              await file.delete();
            }
          } catch (error) {
            throw new AppError(
              `Error deleting file ${file.name}: ${JSON.stringify(error)}`,
              500
            );
          }
        })
      );
    }
  } catch (error) {
    throw new AppError(`Error fetching files with prefix ${prefix}:`, 500);
  }
};

export const deleteFileFromGCS = async (filePath: string) => {
  try {
    const file = storage.bucket(bucketName).file(filePath);

    // Check if the file exists
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
    }
  } catch (error) {
    throw new AppError(
      `Error deleting file ${filePath}: ${JSON.stringify(error)}`,
      500
    );
  }
};
