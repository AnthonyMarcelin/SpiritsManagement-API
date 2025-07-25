import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import whiskyRouter from "./src/routers/whisky.router.js";
import beerRouter from "./src/routers/beer.router.js";
import rhumRouter from "./src/routers/rhum.router.js";
import peatLevelRouter from "./src/routers/peatLevel.router.js";
import typeRouter from "./src/routers/type.router.js";
import labelRouter from "./src/routers/label.router.js";
import originRouter from "./src/routers/origin.router.js";
import supplierRouter from "./src/routers/supplier.router.js";
import userRouter from "./src/routers/user.router.js";
import authRouter from "./src/routers/auth.router.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "spiritsmanagement-api-production.up.railway.app",
  "http://localhost:4200"
]

app.use(cors({
  origin:
  allowedOrigins,
  credentials:true,
}))


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/whisky", whiskyRouter);
app.use("/api/beer", beerRouter);
app.use("/api/rhum", rhumRouter);
app.use("/api/peat", peatLevelRouter);
app.use("/api/type", typeRouter);
app.use("/api/label", labelRouter);
app.use("/api/origin", originRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)

// Export for tests
export default app;

app.listen(process.env.PORT, () => {
  console.log(`Serveur lançé sur le port ${process.env.PORT}`);
});
