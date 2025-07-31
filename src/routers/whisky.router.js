import express from "express";

import whiskyController from "../controllers/whisky.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import verifyEmailConfirmed from "../middlewares/verifiedEmail.middleware.js";
import whiskySchema, { whiskyUpdateSchema } from "../schemas/whisky.schema.js";
import upload from "../utils/multerConfig.js";

const whiskyRouter = express.Router();

whiskyRouter.use(verifyToken);

whiskyRouter.get("/", whiskyController.getAllWhisky);
whiskyRouter.get("/:id", whiskyController.getWhiskyById);
whiskyRouter.get("/types", whiskyController.getWhiskyTypes);
whiskyRouter.post("/", upload.single("photo"), validateBody(whiskySchema), verifyEmailConfirmed, whiskyController.createWhisky);
whiskyRouter.put("/:id", upload.single("photo"), validateBody(whiskyUpdateSchema), whiskyController.updateWhisky);
whiskyRouter.delete("/:id", whiskyController.deleteWhisky);

export default whiskyRouter;
