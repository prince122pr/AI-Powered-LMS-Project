import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temporary folder before uploading to ImageKit
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;  //ensures uniqueness
    cb(null, uniqueName);     //
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|webm/;  // allowed file types
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());  // check file extension: .jpg, .png etc.
    const mimetype = allowedTypes.test(file.mimetype);   // check mime type: image/jpeg, video/mp4 etc.
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos are allowed"));
    }
  },
});

export default upload;
