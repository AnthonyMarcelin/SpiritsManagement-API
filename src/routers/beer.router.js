import express from 'express';
import beerController from '../controllers/beer.controller.js';

const beerRouter = express.Router();

beerRouter.get("/", beerController.getAllBeer);
beerRouter.get("/:id", beerController.getBeerById);

beerRouter.post("/", beerController.createBeer);

export default beerRouter;