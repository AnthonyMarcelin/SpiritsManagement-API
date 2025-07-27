import express from "express";
import beerController from "../controllers/beer.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../utils/multerConfig.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import beerSchema from "../schemas/beer.schema.js";
import verifyEmailConfirmed from "../middlewares/verifiedEmail.middleware.js";

const beerRouter = express.Router();

beerRouter.use(verifyToken);

beerRouter.get("/",beerController.getAllBeer);
beerRouter.get("/:id", beerController.getBeerById);
beerRouter.get("/types", beerController.getBeerTypes);
beerRouter.post("/", validateBody(beerSchema), upload.single("photo"), verifyEmailConfirmed, beerController.createBeer);
beerRouter.put("/:id",validateBody(beerSchema), beerController.updateBeer);
beerRouter.delete("/:id", beerController.deleteBeer);

export default beerRouter;
