
import express from "express";

import authController from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import registerSchema from "../schemas/user.schema.js";

const authRouter = express.Router();

authRouter.post("/register",validateBody(registerSchema), authController.register)
authRouter.post("/login", authController.login)
authRouter.post("/logout", authController.logout);
authRouter.get("/verify-email", authController.verifyEmail);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);


// Resend verification email
authRouter.post("/resend-verification", authController.resendVerification);

// Route to catch connected user
authRouter.get("/me", verifyToken, authController.me);
authRouter.put("/me", verifyToken, authController.updateMe);
authRouter.delete("/me", verifyToken, authController.deleteMe);

export default authRouter;
