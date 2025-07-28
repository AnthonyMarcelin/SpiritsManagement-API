import verifyToken from "../middlewares/auth.middleware.js";
import express from "express";
import labelController from "../controllers/label.controller.js";
import requireAdmin from "../middlewares/admin.middleware.js";

const labelRouter = express.Router();

labelRouter.get("/", verifyToken, labelController.getAllLabel);
labelRouter.get("/:id", labelController.getLabelById);

labelRouter.use(verifyToken, requireAdmin)
labelRouter.post("/", labelController.createLabel);
labelRouter.put("/:id", labelController.updateLabel);
labelRouter.delete("/:id", labelController.deleteLabel);

export default labelRouter;
