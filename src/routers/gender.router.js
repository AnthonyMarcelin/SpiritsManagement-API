import express from 'express';
import genderController from '../controllers/gender.controller.js';

const genderRouter = express.Router();

genderRouter.get("/", genderController.getAllGender);
genderRouter.get("/:id", genderController.getGenderById);

genderRouter.post("/", genderController.createGender);

export default genderRouter;