import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers JPEG sont autorisés !"), false);
  }
}

const upload = multer({ storage, fileFilter });

export default upload;
