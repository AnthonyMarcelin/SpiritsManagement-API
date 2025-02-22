import { Whisky, Rhum, Beer, Label, Supplier, Gender, Nature, Origin, sequelize } from "../models/associations.js";

console.log("Suppresion tables existantes...");
await sequelize.drop({cascade: true});
console.log(Whisky);

console.log("Définition des tables...");
await sequelize.sync()

console.log("Migration ok ! Fermeture de la connexion...");
await sequelize.close();
