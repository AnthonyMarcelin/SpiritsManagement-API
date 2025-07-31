import { sequelize } from "../../models/associations.js";

console.log("Suppression tables existantes...");
await sequelize.drop({ cascade: true });

console.log("Définition des tables...");
await sequelize.sync();

console.log("Migration ok ! Fermeture de la connexion...");
await sequelize.close();
