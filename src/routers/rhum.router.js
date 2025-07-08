import express from "express";
import rhumController from "../controllers/rhum.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import rhumSchema from "../schemas/rhum.schema.js";

const rhumRouter = express.Router();

// Toutes les routes sont privées
rhumRouter.use(verifyToken);

rhumRouter.get("/", rhumController.getAllRhum);
rhumRouter.get("/:id", rhumController.getRhumById);
rhumRouter.get("/types", rhumController.getRhumTypes);
rhumRouter.post("/",validateBody(rhumSchema), upload.single("photo"), rhumController.createRhum);
rhumRouter.put("/:id",validateBody(rhumSchema), upload.single("photo"), rhumController.updateRhum);
rhumRouter.delete("/:id", rhumController.deleteRhum);

export default rhumRouter;
