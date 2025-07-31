import express from 'express';

import originController from '../controllers/origin.controller.js';
import verifyToken from "../middlewares/auth.middleware.js";

const originRouter = express.Router();

originRouter.use(verifyToken);

originRouter.get("/", originController.getAllOrigin);
originRouter.get("/:id", originController.getOriginById);
originRouter.post("/", originController.createOrigin);
originRouter.put("/:id", originController.updateOrigin);
originRouter.delete("/:id", originController.deleteOrigin);

export default originRouter;
