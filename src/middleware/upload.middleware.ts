import multer from "multer";
import path from "path";
import crypto from "crypto";

type uploadFolder = "products" | "restaurants" | "users";

export const createUpload = (folder: uploadFolder) => {
  console.log("i am in upload");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folder}`);
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${crypto.randomUUID()}${ext}`);
    },
  });
  console.log("before creating the middleware");
  return multer({
    storage,
    limits: {
      fileSize: 3 * 1024 * 1024,
      files: 10,
    },
  });
};

/*Frontend
- resize large images
- compress image quality
- optionally convert to WebP
- show upload preview
- prevent obviously huge files before request

Backend
- never trust frontend
- enforce max file size
- enforce max number of files
- validate allowed file types
- generate safe filenames
- save into module folder
- store path/metadata in DB

How to save media ?
Simple one-image property
→ upload with create/update
→ cleanup file if DB fails

Media collection/table
→ create parent first
→ separate media endpoint
→ create media rows afterward

Multer saves image
        ↓
try create User
        ↓
     success? 
   yes       no => we should catch the error in service not controller so we call the delete helper
    ↓         ↓
keep       delete 
image      image
*/
