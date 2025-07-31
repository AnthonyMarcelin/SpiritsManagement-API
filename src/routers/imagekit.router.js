
import crypto from "crypto";

import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// stock in .env file
const { IMAGEKIT_PRIVATE_KEY } = process.env;

router.get("/auth", authMiddleware, (req, res) => {

  if (!IMAGEKIT_PRIVATE_KEY) {
    return res.status(500).json({ error: "Clé privée ImageKit manquante" });

  }

  const token = crypto.randomBytes(16).toString("hex");

  const expire = Math.floor(Date.now() / 1000) + 600; // expire in 10 min

  const signature = crypto
    .createHmac("sha1", IMAGEKIT_PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");
  res.json({ token, expire, signature });

});

export default router;
