import verifyToken from "../middlewares/auth.middleware.js";
import express from "express";
import peatLevelController from "../controllers/peatLevel.controller.js";
import requireAdmin from "../middlewares/admin.middleware.js";

const peatLevelRouter = express.Router();

peatLevelRouter.get("/", verifyToken, peatLevelController.getAllPeatLevel);
peatLevelRouter.get("/:id", verifyToken, peatLevelController.getPeatLevelById);

peatLevelRouter.use(verifyToken, requireAdmin);
peatLevelRouter.post("/", peatLevelController.createPeatLevel);
peatLevelRouter.put("/:id", peatLevelController.updatePeatLevel);
peatLevelRouter.delete("/:id", peatLevelController.deletePeatLevel);

export default peatLevelRouter;
