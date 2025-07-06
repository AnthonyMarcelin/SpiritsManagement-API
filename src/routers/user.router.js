import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserById);

userRouter.post("/", userController.createUser);

userRouter.put("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
