import express from "express";
import peatLevelController from "../controllers/peatLevel.controller.js";

const peatLevelRouter = express.Router();

peatLevelRouter.get("/", peatLevelController.getAllPeatLevel);
peatLevelRouter.get("/:id", peatLevelController.getPeatLevelById);
peatLevelRouter.post("/", peatLevelController.createPeatLevel);
peatLevelRouter.put("/:id", peatLevelController.updatePeatLevel);
peatLevelRouter.delete("/:id", peatLevelController.deletePeatLevel);

export default peatLevelRouter;
