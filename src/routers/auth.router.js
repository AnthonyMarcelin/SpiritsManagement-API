import express from "express";
import authController from "../controllers/auth.controller.js";
import loginLimiter from "../middlewares/rateLimiter.middleware.js";
import registerSchema from "../schemas/user.schema.js";
import validateBody from "../middlewares/validateBody.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",validateBody(registerSchema), authController.register)
authRouter.post("/login", loginLimiter, authController.login)

export default authRouter;
