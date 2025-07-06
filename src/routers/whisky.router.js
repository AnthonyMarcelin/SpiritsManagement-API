import express from "express";
import multer from "multer";
import path from "path";
import whiskyController from "../controllers/whisky.controller.js";

const whiskyRouter = express.Router();

// Configuration Multer pour n'accepter que les JPEG
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers JPEG sont autorisés !"), false);
  }
};
const upload = multer({ storage, fileFilter });

whiskyRouter.get("/", whiskyController.getAllWhisky);
whiskyRouter.get("/:id", whiskyController.getWhiskyById);
whiskyRouter.get("/types", whiskyController.getWhiskyTypes);

// Nouvelle route POST avec upload de photo
whiskyRouter.post("/", upload.single("photo"), whiskyController.createWhisky);
whiskyRouter.put("/:id", upload.single("photo"), whiskyController.updateWhisky);

export default whiskyRouter;
