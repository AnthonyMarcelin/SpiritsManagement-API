import express from 'express';
import whiskyController from '../controllers/whisky.controller.js';

const whiskyRouter = express.Router();

whiskyRouter.get("/", whiskyController.getAllWhisky);
whiskyRouter.get("/:id", whiskyController.getWhiskyById);

whiskyRouter.post("/", whiskyController.createWhisky);

export default whiskyRouter;