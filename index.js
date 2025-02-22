import 'dotenv/config';
import express from 'express';
import bodyParser from 'express';

import whiskyRouter from './src/routers/whisky.router.js';
import genderRouter from './src/routers/gender.router.js';
import labelRouter from './src/routers/label.router.js';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/whisky", whiskyRouter);
app.use("/api/gender", genderRouter);
app.use("/api/label", labelRouter);

app.listen(process.env.PORT, () => {
    console.log(`Serveur lançé sur le port ${process.env.PORT}`);
});