import express from "express";
import multer from "multer";
import path from "path";
import rhumController from "../controllers/rhum.controller.js";

const rhumRouter = express.Router();

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

rhumRouter.get("/", rhumController.getAllRhum);
rhumRouter.get("/:id", rhumController.getRhumById);
rhumRouter.get("/types", rhumController.getRhumTypes);
rhumRouter.post("/", upload.single("photo"), rhumController.createRhum);
rhumRouter.put("/:id", upload.single("photo"), rhumController.updateRhum);
rhumRouter.delete("/:id", rhumController.deleteRhum);

export default rhumRouter;
