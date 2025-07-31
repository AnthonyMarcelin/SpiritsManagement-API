import express from "express";

import userController from "../controllers/user.controller.js";
import requireAdmin from "../middlewares/admin.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(verifyToken);

userRouter.get("/", requireAdmin, userController.getAllUser);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
