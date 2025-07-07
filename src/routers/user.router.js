import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import requireAdmin from "../middlewares/admin.middleware.js";

const userRouter = express.Router();

userRouter.use(verifyToken);

userRouter.get("/", requireAdmin, userController.getAllUser); // seul l'admin peut voir tous les users
userRouter.get("/:id", userController.getUserById); // chaque user ou admin
userRouter.put("/:id", userController.updateUser); // chaque user ou admin
userRouter.delete("/:id", userController.deleteUser); // chaque user ou admin

export default userRouter;
