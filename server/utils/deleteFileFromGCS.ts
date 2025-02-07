import { bucketName, storage } from "../config/googleStorage";

export const deleteFilesFromGCS = async (prefix: string) => {
  const [files] = await storage.bucket(bucketName).getFiles({ prefix });
  if (files.length) {
    await Promise.all(files.map((file) => file.delete()));
  }
};

export const deleteFileFromGCS = async (filePath: string) => {
  await storage.bucket(bucketName).file(filePath)?.delete();
};
