import express from "express";
import authController from "../controllers/auth.controller.js";
import loginLimiter from "../middlewares/rateLimiter.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register)
authRouter.post("/login", loginLimiter, authController.login)

export default authRouter;
