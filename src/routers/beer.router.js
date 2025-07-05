import express from "express";
import beerController, {
  getBeerTypes,
} from "../controllers/beer.controller.js";
import multer from "multer";
import path from "path";

const beerRouter = express.Router();

// Configuration Multer pour n'accepter que les JPEG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
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

beerRouter.get("/", beerController.getAllBeer);
beerRouter.get("/:id", beerController.getBeerById);
beerRouter.get("/types", getBeerTypes);

// Nouvelle route POST avec upload de photo
beerRouter.post("/", upload.single("photo"), beerController.createBeer);
beerRouter.put("/:id", beerController.updateBeer);
beerRouter.delete("/:id", beerController.deleteBeer);

export default beerRouter;
