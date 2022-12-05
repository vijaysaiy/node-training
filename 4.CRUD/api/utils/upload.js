import multer from "multer";
import path from "path";
import * as uuid from "uuid";

export const UPLOAD_DIRECTORY = "uploads";

const storage = multer.diskStorage({
  destination: UPLOAD_DIRECTORY,
  filename: (req, file, cb) =>
    cb(null, uuid.v4() + path.extname(file.originalname)),
});

export const upload = multer({ storage });
