import { sequelize } from "../models/associations.js";

console.log("Création des tables si besoin...");
await sequelize.sync();

console.log("Tables créées ! Fermeture de la connexion...");
await sequelize.close();
