import fs from "fs/promises";
import { file, string } from "zod";

export const deleteFile = async (filePath?: string) => {
  if (!filePath) {
    return;
  }
  try {
    await fs.unlink(filePath);
  } catch (error) {
    // Later we can add logger here.
    console.log(error);
  }
};

export const deleteFiles = async (files?: Express.Multer.File[]) => {
  if (!files?.length) {
    return;
  }

  await Promise.allSettled(
    files.map((file) => {
      fs.unlink(file.path);
    }),
  );
};
