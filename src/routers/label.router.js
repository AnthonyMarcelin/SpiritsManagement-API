import express from 'express';
import labelController from '../controllers/label.controller.js';

const labelRouter = express.Router();

labelRouter.get("/", labelController.getAllLabel);
labelRouter.get("/:id", labelController.getLabelById);

labelRouter.post("/", labelController.createLabel);

export default labelRouter;