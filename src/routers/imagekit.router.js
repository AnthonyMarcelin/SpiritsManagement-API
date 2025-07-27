
import express from "express";
import crypto from "crypto";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// À stocker dans une variable d'environnement !
const { IMAGEKIT_PRIVATE_KEY } = process.env;

router.get("/auth", authMiddleware, (req, res) => {
  if (!IMAGEKIT_PRIVATE_KEY) {
    return res.status(500).json({ error: "Clé privée ImageKit manquante" });
  }
  const token = crypto.randomBytes(16).toString("hex");
  const expire = Math.floor(Date.now() / 1000) + 600; // expire dans 10 min
  const signature = crypto
    .createHmac("sha1", IMAGEKIT_PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");
  res.json({ token, expire, signature });
});

export default router;
