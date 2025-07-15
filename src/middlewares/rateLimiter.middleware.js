import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 attempts
  message: {
    error: "Trop de tentatives de connexion, veuillez réessayer dans 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
