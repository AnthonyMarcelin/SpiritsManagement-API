import express from "express";
import whiskyController from "../controllers/whisky.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";

const whiskyRouter = express.Router();

// Route publique pour les tests
whiskyRouter.get("/", whiskyController.getAllWhisky);

// Routes protégées
whiskyRouter.get("/types", verifyToken, whiskyController.getWhiskyTypes);
whiskyRouter.get("/:id", verifyToken, whiskyController.getWhiskyById);
whiskyRouter.post("/", verifyToken, upload.single("photo"), whiskyController.createWhisky);
whiskyRouter.put("/:id", verifyToken, upload.single("photo"), whiskyController.updateWhisky);
whiskyRouter.delete("/:id", verifyToken, whiskyController.deleteWhisky);

export default whiskyRouter;
