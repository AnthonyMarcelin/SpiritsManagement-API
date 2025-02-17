import { Whisky, Rhum, Beer, Label, Supplier, Type, sequelize } from "../models/associations.js";

console.log("suppresion tables existantes...");
await sequelize.drop({cascade: true});

console.log("Définition des tables...");
await sequelize.sync()

console.log("Migration ok ! Fermeture de la connexion...");
await sequelize.close();
