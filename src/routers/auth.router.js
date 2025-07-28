
import express from "express";
import authController from "../controllers/auth.controller.js";
import registerSchema from "../schemas/user.schema.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",validateBody(registerSchema), authController.register)
authRouter.post("/login", authController.login)
authRouter.post("/logout", authController.logout);
authRouter.get("/verify-email", authController.verifyEmail);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);

// Route to catch connected user
authRouter.get("/me", verifyToken, authController.me);

export default authRouter;
