import 'dotenv/config';
import express from 'express';
import bodyParser from 'express';

import whiskyRouter from './src/routers/whisky.router.js';
import genderRouter from './src/routers/gender.router.js';
import labelRouter from './src/routers/label.router.js';
import natureController from './src/controllers/nature.controller.js';
import originRouter from './src/routers/origin.router.js';
import rhumRouter from './src/routers/rhum.router.js';
import supplierRouter from './src/routers/supplier.router.js';
import beerRouter from './src/routers/beer.router.js';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/whisky", whiskyRouter);
app.use("/api/gender", genderRouter);
app.use("/api/label", labelRouter);
app.use("/api/nature", natureController);
app.use("/api/origin", originRouter);
app.use("/api/rhum", rhumRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/beer", beerRouter);

app.listen(process.env.PORT, () => {
    console.log(`Serveur lançé sur le port ${process.env.PORT}`);
});