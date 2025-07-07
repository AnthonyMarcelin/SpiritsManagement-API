import express from "express";
import whiskyController from "../controllers/whisky.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";

const whiskyRouter = express.Router();

whiskyRouter.get("/", whiskyController.getAllWhisky);
whiskyRouter.get("/:id", whiskyController.getWhiskyById);
whiskyRouter.get("/types", whiskyController.getWhiskyTypes);

// routes protégées
whiskyRouter.use(verifyToken);
whiskyRouter.post("/", upload.single("photo"), whiskyController.createWhisky);
whiskyRouter.put("/:id", upload.single("photo"), whiskyController.updateWhisky);
whiskyRouter.delete("/:id", whiskyController.deleteWhisky);

export default whiskyRouter;
