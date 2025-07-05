import {
  Whisky,
  Rhum,
  Beer,
  Label,
  Supplier,
  Type,
  Origin,
  PeatLevel,
  sequelize,
} from "../models/associations.js";

// Fonction utilitaire pour garantir l'existence d'un type
const ensureType = async (name, flags) => {
  const [type] = await Type.findOrCreate({ where: { name, ...flags } });
  return type;
};

console.log("Ajout des données de référence...");

// Labels
const excellent = await Label.create({ name: "Excellent", color: "#F00" });
const bon = await Label.create({ name: "Bon", color: "#0F0" });
const moyen = await Label.create({ name: "Moyen", color: "#FF0" });

// PeatLevels (pour whisky uniquement)
const peatLevels = [
  "Non tourbé",
  "Peu tourbé",
  "Moyennement tourbé",
  "Très tourbé",
  "Extrême tourbé",
  "Iodé",
  "Médicinal",
  "Fumé",
  "Terreux",
  "Tourbé",
  "Tourbé côtier",
  "Épicé",
  "Doux",
];
for (const name of peatLevels) {
  await PeatLevel.create({ name });
}

// Récupération de l'id du niveau "Non tourbé" pour le whisky de test
const nonTourbePeat = await PeatLevel.findOne({
  where: { name: "Non tourbé" },
});

// Types (avec filtrage par alcool)
const singleMalt = await ensureType("single malt", { for_whisky: true });
const blend = await ensureType("blend", { for_whisky: true });
const rhumBlanc = await ensureType("blanc", { for_rhum: true });
const rhumAmbre = await ensureType("ambré", { for_rhum: true });
const biereBlonde = await ensureType("blonde", { for_beer: true });
const biereBrune = await ensureType("brune", { for_beer: true });

// Types spécifiques whisky
const whiskyTypes = [
  "Single Malt",
  "Blended Malt",
  "Single Grain",
  "Blended Grain",
  "Blended Whisky",
  "Bourbon",
  "Tennessee Whiskey",
  "Rye Whiskey",
  "Wheat Whiskey",
  "Corn Whiskey",
  "Single Pot Still",
  "Cask Strength",
  "Single Cask",
  "Peated",
  "Unpeated",
  "Triple Distilled",
  "Double Distilled",
  "NAS (No Age Statement)",
  "Sherry Cask Finish",
  "Port Cask Finish",
  "Wine Cask Finish",
  "Rum Cask Finish",
  "Madeira Cask Finish",
  "Virgin Oak",
  "Mizunara Cask Finish",
  "Experimental / Limited Edition",
  "World Whisky",
];
for (const typeName of whiskyTypes) {
  await ensureType(typeName, { for_whisky: true });
}

// Types spécifiques rhum (création AVANT toute utilisation)
const rhumTypes = [
  "Blanc",
  "Ambré",
  "Vieux",
  "Aged Rum",
  "Rhum Agricole",
  "Rhum Industriel",
  "Rhum Traditionnel",
  "Rhum Arrangé",
  "Overproof",
  "Cachaça",
  "Spiced Rum",
  "Solera",
  "Single Cask",
  "Cask Strength",
  "Finish Sherry",
  "Finish Porto",
  "Finish Vin",
  "Finish Rhum",
  "Finish Cognac",
  "Finish Bourbon",
  "Finish Whisky",
  "Finish Tequila",
  "Finish Armagnac",
  "Finish Calvados",
  "Finish Sauternes",
  "Finish Madère",
  "Finish Marsala",
  "Finish Pineau",
  "Finish Banyuls",
  "Finish Xérès",
  "Finish Tokaji",
  "Finish Vin Doux Naturel",
  "Finish Vin de Liqueur",
  "Finish Vin Jaune",
  "Finish Vin de Paille",
  "Finish Vin Orange",
  "Finish Vin Rouge",
  "Finish Vin Blanc",
];
for (const typeName of rhumTypes) {
  await ensureType(typeName, { for_rhum: true });
}

// Types spécifiques bière (création AVANT toute utilisation)
const beerTypes = ["IPA (India Pale Ale)", "Hefeweizen", "Stout", "Punk IPA"];
for (const typeName of beerTypes) {
  await ensureType(typeName, { for_beer: true });
}

// Origines (à placer avant toute utilisation)
const ecosse = await Origin.create({ country: "Ecosse" });
const irlande = await Origin.create({ country: "Irlande" });

// Suppliers (à placer avant toute utilisation)
const supplier1 = await Supplier.create({
  name: "La Maison du Whisky",
  adress: "Paris",
});
const supplier2 = await Supplier.create({ name: "Whisky.fr", adress: "Lyon" });

console.log("Ajout de whisky de test...");
const AberlourWhisky = await Whisky.create({
  name: "Aberlour",
  description: "Très bon",
  price: 35.9,
  label_id: excellent.id,
  origin_id: ecosse.id,
  supplier_id: supplier1.id,
  peat_level_id: nonTourbePeat.id,
  type_id: singleMalt.id,
});

// Ajout de plusieurs whiskies
await Whisky.create({
  name: "Laphroaig 10",
  description: "Tourbé, iodé, médicinal, classique d'Islay.",
  review: "Puissant, salin, fumé, finale longue.",
  price: 49.9,
  label_id: excellent.id,
  origin_id: ecosse.id,
  supplier_id: supplier1.id,
  peat_level_id: (
    await PeatLevel.findOne({ where: { name: "Très tourbé" } })
  ).id,
  type_id: (await ensureType("Single Malt", { for_whisky: true })).id,
  photo: null,
});
await Whisky.create({
  name: "Aberfeldy 12",
  description: "Miel, fruits jaunes, douceur, Highlands.",
  review: "Rond, doux, notes de miel, finale courte.",
  price: 39.5,
  label_id: bon.id,
  origin_id: ecosse.id,
  supplier_id: supplier2.id,
  peat_level_id: (
    await PeatLevel.findOne({ where: { name: "Non tourbé" } })
  ).id,
  type_id: (await ensureType("Single Malt", { for_whisky: true })).id,
  photo: null,
});
await Whisky.create({
  name: "Redbreast 12",
  description: "Single Pot Still irlandais, fruité, épicé.",
  review: "Complexe, fruits rouges, épices douces.",
  price: 62.0,
  label_id: excellent.id,
  origin_id: irlande.id,
  supplier_id: supplier1.id,
  peat_level_id: (
    await PeatLevel.findOne({ where: { name: "Non tourbé" } })
  ).id,
  type_id: (await ensureType("Single Pot Still", { for_whisky: true })).id,
  photo: null,
});

console.log("Ajout de rhum de test...");
const DiplomaticoRhum = await Rhum.create({
  name: "Diplomatico",
  description: "Rhum vénézuélien doux",
  price: 42.0,
  label_id: bon.id,
  origin_id: irlande.id,
  supplier_id: supplier2.id,
  type_id: rhumBlanc.id,
});

// Ajout de plusieurs rhums (utilisation de ensureType partout)
await Rhum.create({
  name: "Diplomatico Reserva Exclusiva",
  description: "Rhum vénézuélien doux, notes de caramel et d'orange.",
  price: 42.0,
  label_id: bon.id,
  origin_id: irlande.id,
  supplier_id: supplier2.id,
  type_id: (await ensureType("Aged Rum", { for_rhum: true })).id,
});
await Rhum.create({
  name: "Clément Canne Bleue",
  description: "Rhum agricole blanc, Martinique, canne fraîche.",
  price: 29.0,
  label_id: moyen.id,
  origin_id: ecosse.id,
  supplier_id: supplier1.id,
  type_id: (await ensureType("Blanc", { for_rhum: true })).id,
});
await Rhum.create({
  name: "Neisson XO",
  description: "Rhum vieux agricole, boisé, épicé, fruits secs.",
  price: 85.0,
  label_id: excellent.id,
  origin_id: irlande.id,
  supplier_id: supplier2.id,
  type_id: (await ensureType("Vieux", { for_rhum: true })).id,
});

console.log("Ajout de bière de test...");
const PunkIPA = await Beer.create({
  name: "Punk IPA",
  description: "Bière craft écossaise",
  price: 3.5,
  label_id: moyen.id,
  origin_id: ecosse.id,
  supplier_id: supplier1.id,
  type_id: (await ensureType("Punk IPA", { for_beer: true })).id,
});

// Ajout de plusieurs bières (utilisation de ensureType partout)
await Beer.create({
  name: "Punk IPA",
  description: "Bière craft écossaise, houblonnée, agrumes.",
  price: 3.5,
  label_id: moyen.id,
  origin_id: ecosse.id,
  supplier_id: supplier1.id,
  type_id: (await ensureType("IPA (India Pale Ale)", { for_beer: true })).id,
});
await Beer.create({
  name: "Weihenstephaner Hefeweissbier",
  description: "Blanche allemande, banane, clou de girofle.",
  price: 2.8,
  label_id: bon.id,
  origin_id: irlande.id,
  supplier_id: supplier2.id,
  type_id: (await ensureType("Hefeweizen", { for_beer: true })).id,
});
await Beer.create({
  name: "Guinness Draught",
  description: "Stout irlandaise, crémeuse, torréfiée.",
  price: 3.2,
  label_id: moyen.id,
  origin_id: irlande.id,
  supplier_id: supplier1.id,
  type_id: (await ensureType("Stout", { for_beer: true })).id,
});

console.log("Migration OK ! Fermeture de la connexion");
await sequelize.close();
