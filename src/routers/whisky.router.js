import express from "express";
import whiskyController from "../controllers/whisky.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";
import verifyEmailConfirmed from "../middlewares/verifiedEmail.middleware.js";

const whiskyRouter = express.Router();

whiskyRouter.use(verifyToken);

whiskyRouter.get("/", verifyToken, whiskyController.getAllWhisky);
whiskyRouter.get("/types", verifyToken, whiskyController.getWhiskyTypes);
whiskyRouter.get("/:id", verifyToken, whiskyController.getWhiskyById);
whiskyRouter.post("/", verifyToken, upload.single("photo"), verifyEmailConfirmed, whiskyController.createWhisky);
whiskyRouter.put("/:id", verifyToken, upload.single("photo"), whiskyController.updateWhisky);
whiskyRouter.delete("/:id", verifyToken, whiskyController.deleteWhisky);

export default whiskyRouter;
