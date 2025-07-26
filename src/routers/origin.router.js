import verifyToken from "../middlewares/auth.middleware.js";
import express from 'express';
import originController from '../controllers/origin.controller.js';
import requireAdmin from '../middlewares/admin.middleware.js';

const originRouter = express.Router();

originRouter.get("/", verifyToken, originController.getAllOrigin);
originRouter.get("/:id", originController.getOriginById);

originRouter.use(requireAdmin);
originRouter.post("/", originController.createOrigin);
originRouter.put("/:id", originController.updateOrigin);
originRouter.delete("/:id", originController.deleteCountry);

export default originRouter;
