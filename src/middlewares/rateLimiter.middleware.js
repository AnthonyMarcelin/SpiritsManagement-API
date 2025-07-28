import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5, // 5 attempts
  message: {
    error: "Trop de tentatives de connexion, veuillez réessayer dans 1 minute."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
