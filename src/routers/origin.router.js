import express from 'express';
import originController from '../controllers/origin.controller.js';

const originRouter = express.Router();

originRouter.get("/", originController.getAllOrigin);
originRouter.get("/:id", originController.getOriginById);
originRouter.post("/", originController.createOrigin);
originRouter.put("/:id", originController.updateOrigin);
originRouter.delete("/:id", originController.deleteCountry);

export default originRouter;
