import express from "express";
import typeController from "../controllers/type.controller.js";

const typeRouter = express.Router();

typeRouter.get("/", typeController.getAllType);
typeRouter.get("/:id", typeController.getTypeById);
typeRouter.post("/", typeController.createType);
typeRouter.put("/:id", typeController.updateType);
typeRouter.delete("/:id", typeController.deleteType);

export default typeRouter;
