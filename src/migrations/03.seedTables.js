import { Whisky, Rhum, Beer, Label, Supplier, Nature, Origin, Gender, sequelize } from "../models/associations.js";

// * Ajout de whisky fictif

console.log("Ajout de whisky de test...");

// Ici, on insère de fausses données de tests
const AberlourWhisky = await Whisky.create({
  name: "Aberlour",
  description: "Très bon",
  gender: "non tourbé",
  nature: "single malt",
  price: 35.90,
});

// * LISTE DE LABELS FICTIFS

console.log("Ajout de labels de test...");

const excellent = await Label.create({
  name: "Excellent",
  color: "#F00",
});

// Je peux ensuite ajouter des tags sur des cartes
console.log("Ajout de label sur notre whisky...");

await AberlourWhisky.addLabel(excellent); 

console.log("Migration OK ! Fermeture de la connexion");

// On ferme la connexion entre le serveur de BDD et le serveur API
await sequelize.close();