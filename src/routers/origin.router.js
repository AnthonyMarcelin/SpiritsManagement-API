import verifyToken from "../middlewares/auth.middleware.js";
import express from 'express';
import originController from '../controllers/origin.controller.js';
import requireAdmin from '../middlewares/admin.middleware.js';

const originRouter = express.Router();

originRouter.get("/", verifyToken, originController.getAllOrigin);
originRouter.get("/:id", originController.getOriginById);
originRouter.post("/", originController.createOrigin);
originRouter.put("/:id", originController.updateOrigin);

originRouter.use(requireAdmin);
originRouter.delete("/:id", originController.deleteOrigin);

export default originRouter;
