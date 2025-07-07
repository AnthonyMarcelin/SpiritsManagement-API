import express from "express";
import beerController from "../controllers/beer.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";

const beerRouter = express.Router();

beerRouter.get("/", beerController.getAllBeer);
beerRouter.get("/:id", beerController.getBeerById);
beerRouter.get("/types", beerController.getBeerTypes);

// routes protégées
beerRouter.use(verifyToken);
beerRouter.post("/", upload.single("photo"), beerController.createBeer);
beerRouter.put("/:id", beerController.updateBeer);
beerRouter.delete("/:id", beerController.deleteBeer);

export default beerRouter;
