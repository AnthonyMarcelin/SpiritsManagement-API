import express from 'express';
import rhumController from '../controllers/rhum.controller.js';

const rhumRouter = express.Router();

rhumRouter.get("/", rhumController.getAllRhum);
rhumRouter.get("/:id", rhumController.getRhumById);

rhumRouter.post("/", rhumController.createRhum);

export default rhumRouter;