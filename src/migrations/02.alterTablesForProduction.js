import { sequelize } from "../models/associations.js";

// Exemple : ajout d'une colonne 'avatar' à la table User
await sequelize.getQueryInterface().addColumn("Users", "avatar", {
  type: sequelize.Sequelize.STRING,
  allowNull: true,
});

// Exemple : modification du type d'une colonne (ici, note sur Whisky)
await sequelize.getQueryInterface().changeColumn("Whiskies", "note", {
  type: sequelize.Sequelize.INTEGER,
  allowNull: true,
});

// Ajoutez ici d'autres modifications nécessaires, toujours sans supprimer les données existantes

console.log("Migration non destructive terminée !");
