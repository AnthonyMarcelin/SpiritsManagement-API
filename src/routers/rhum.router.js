import express from "express";
import rhumController from "../controllers/rhum.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import rhumSchema from "../schemas/rhum.schema.js";
import verifyEmailConfirmed from "../middlewares/verifiedEmail.middleware.js";

const rhumRouter = express.Router();

rhumRouter.use(verifyToken);

rhumRouter.get("/", rhumController.getAllRhum);
rhumRouter.get("/:id", rhumController.getRhumById);
rhumRouter.get("/types", rhumController.getRhumTypes);
rhumRouter.post("/", upload.single("photo"), validateBody(rhumSchema), verifyEmailConfirmed, rhumController.createRhum);
rhumRouter.put("/:id", upload.single("photo"), validateBody(rhumSchema), rhumController.updateRhum);
rhumRouter.delete("/:id", rhumController.deleteRhum);

export default rhumRouter;
