import express from "express";

import beerController from "../controllers/beer.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import validateBody from "../middlewares/validateBody.middleware.js";
import verifyEmailConfirmed from "../middlewares/verifiedEmail.middleware.js";
import beerSchema, { beerUpdateSchema } from "../schemas/beer.schema.js";
import upload from "../utils/multerConfig.js";

const beerRouter = express.Router();

beerRouter.use(verifyToken);

beerRouter.get("/",beerController.getAllBeer);
beerRouter.get("/:id", beerController.getBeerById);
beerRouter.get("/types", beerController.getBeerTypes);
beerRouter.post("/", upload.single("photo"), validateBody(beerSchema), verifyEmailConfirmed, beerController.createBeer);
beerRouter.put("/:id", upload.single("photo"), validateBody(beerUpdateSchema), beerController.updateBeer);
beerRouter.delete("/:id", beerController.deleteBeer);

export default beerRouter;
