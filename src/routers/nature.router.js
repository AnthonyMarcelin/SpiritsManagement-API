import express from 'express';
import natureController from '../controllers/nature.controller.js';

const natureRouter = express.Router();

natureRouter.get("/", natureController.getAllNature);
natureRouter.get("/:id", natureController.getNatureById);

natureRouter.post("/", natureController.createNature);

export default natureRouter;