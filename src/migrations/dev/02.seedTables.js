import argon2 from "argon2";

import {
  Whisky,
  Rhum,
  Beer,
  Label,
  Supplier,
  Type,
  Origin,
  PeatLevel,
  User
} from "../../models/associations.js";

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
await Promise.all(
  peatLevels.map((name) => PeatLevel.create({ name }))
);

// Récupération de l'id du niveau "Non tourbé" pour le whisky de test
const nonTourbePeat = await PeatLevel.findOne({
  where: { name: "Non tourbé" },
});

// Types (avec filtrage par alcool)
const singleMalt = await ensureType("single malt", { forWhisky: true });
const rhumBlanc = await ensureType("blanc", { forRhum: true });
await ensureType("blend", { forWhisky: true });
await ensureType("ambré", { forRhum: true });
await ensureType("blonde", { forBeer: true });
await ensureType("brune", { forBeer: true });

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
await Promise.all(
  whiskyTypes.map((typeName) => ensureType(typeName, { forWhisky: true }))
);

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
await Promise.all(
  rhumTypes.map((typeName) => ensureType(typeName, { forRhum: true }))
);

// Types spécifiques bière (création AVANT toute utilisation)
const beerTypes = [
  "Pilsner",
  "Helles",
  "Vienna Lager",
  "Amber Lager",
  "Dunkel",
  "Schwarzbier",
  "Bock",
  "Doppelbock",
  "Eisbock",
  "Pale Ale",
  "IPA (India Pale Ale)",
  "Double IPA",
  "NEIPA",
  "Session IPA",
  "American Pale Ale",
  "Blonde Ale",
  "Amber Ale",
  "Red Ale",
  "Brown Ale",
  "Scotch Ale",
  "Barleywine",
  "Porter",
  "Stout",
  "Milk Stout",
  "Oatmeal Stout",
  "Imperial Stout",
  "Witbier",
  "Hefeweizen",
  "Dunkelweizen",
  "Weizenbock",
  "Berliner Weisse",
  "Gose",
  "Saison",
  "Bière de Garde",
  "Lambic",
  "Gueuze",
  "Kriek",
  "Fruit Lambic",
  "Rauchbier",
  "Baltic Porter",
  "Bière aux fruits",
  "Bière épicée",
  "Bière au miel",
  "Bière fumée",
  "Bière forte",
  "Bière légère",
  "Bière blanche",
  "Bière blonde",
  "Bière ambrée",
  "Bière brune",
  "Bière noire",
  "Bière acide",
  "Bière fruitée",
  "Bière ronde",
  "Bière sèche",
  "Bière sucrée",
  "Bière vieilli en fût",
  "Bière sans alcool",
  "Bière bio",
  "Bière expérimentale"
];
await Promise.all(
  beerTypes.map((typeName) => ensureType(typeName, { forBeer: true }))
);

// Origines (à placer avant toute utilisation)
const ecosse = await Origin.create({ country: "Ecosse" });
const irlande = await Origin.create({ country: "Irlande" });

// Suppliers (à placer avant toute utilisation)
const supplier1 = await Supplier.create({
  name: "La Maison du Whisky",
  adress: "Paris",
});
const supplier2 = await Supplier.create({ name: "Whisky.fr", adress: "Lyon" });

// Création de 3 utilisateurs de test (à faire AVANT tout ce qui a besoin de userId)
const adminPassword = await argon2.hash("Admin123!");
const johnPassword = await argon2.hash("JohnDoe1@");
const janePassword = await argon2.hash("JaneSmi2#");

const adminUser = await User.create({
  pseudo: "admin",
  firstname: "Admin",
  lastname: "User",
  email: "admin@example.com",
  password: adminPassword, // Hashé avec argon2
  isAdmin: true,
  isVerified: true, // Admin vérifié d'office
});
const johnUser = await User.create({
  pseudo: "john",
  firstname: "John",
  lastname: "Doe",
  email: "john@example.com",
  password: johnPassword, // Hashé avec argon2
  isAdmin: false,
  isVerified: true, // Utilisateur de test vérifié
});
const janeUser = await User.create({
  pseudo: "jane",
  firstname: "Jane",
  lastname: "Smith",
  email: "jane@example.com",
  password: janePassword, // Hashé avec argon2
  isAdmin: false,
  isVerified: false, // Utilisateur de test non vérifié pour les tests
});

console.log("Ajout de whisky de test...");
await Whisky.create({
  name: "Aberlour",
  description: "Très bon",
  price: 35.9,
  labelId: excellent.id,
  originId: ecosse.id,
  supplierId: supplier1.id,
  peatLevelId: nonTourbePeat.id,
  typeId: singleMalt.id,
  userId: adminUser.id,
  photo: "https://picsum.photos/id/1011/400/300",
  note: 4,
});
await Whisky.create({
  name: "Laphroaig 10",
  description: "Tourbé, iodé, médicinal, classique d'Islay.",
  review: "Puissant, salin, fumé, finale longue.",
  price: 49.9,
  labelId: excellent.id,
  originId: ecosse.id,
  supplierId: supplier1.id,
  peatLevelId: (
    await PeatLevel.findOne({ where: { name: "Très tourbé" } })
  ).id,
  typeId: (await ensureType("Single Malt", { for_whisky: true })).id,
  userId: adminUser.id,
  photo: "https://picsum.photos/id/1011/400/300",
  note: 5,
});
await Whisky.create({
  name: "Aberfeldy 12",
  description: "Miel, fruits jaunes, douceur, Highlands.",
  review: "Rond, doux, notes de miel, finale courte.",
  price: 39.5,
  labelId: bon.id,
  originId: ecosse.id,
  supplierId: supplier2.id,
  peatLevelId: (
    await PeatLevel.findOne({ where: { name: "Non tourbé" } })
  ).id,
  typeId: (await ensureType("Single Malt", { for_whisky: true })).id,
  userId: johnUser.id,
  photo: "https://picsum.photos/id/1011/400/300",
  note: 3,
});
await Whisky.create({
  name: "Redbreast 12",
  description: "Single Pot Still irlandais, fruité, épicé.",
  review: "Complexe, fruits rouges, épices douces.",
  price: 62.0,
  labelId: excellent.id,
  originId: irlande.id,
  supplierId: supplier1.id,
  peatLevelId: (
    await PeatLevel.findOne({ where: { name: "Non tourbé" } })
  ).id,
  typeId: (await ensureType("Single Pot Still", { for_whisky: true })).id,
  userId: janeUser.id,
  photo: "https://picsum.photos/id/1011/400/300",
  note: 5,
});

console.log("Ajout de rhum de test...");
await Rhum.create({
  name: "Diplomatico",
  description: "Rhum vénézuélien doux",
  price: 42.0,
  labelId: bon.id,
  originId: irlande.id,
  supplierId: supplier2.id,
  typeId: rhumBlanc.id,
  userId: adminUser.id,
  photo: "https://picsum.photos/id/1012/400/300",
  note: 5,
});

// Ajout de plusieurs rhums (utilisation de ensureType partout)
await Rhum.create({
  name: "Diplomatico Reserva Exclusiva",
  description: "Rhum vénézuélien doux, notes de caramel et d'orange.",
  price: 42.0,
  labelId: bon.id,
  originId: irlande.id,
  supplierId: supplier2.id,
  typeId: (await ensureType("Aged Rum", { for_rhum: true })).id,
  userId: johnUser.id,
  photo: "https://picsum.photos/id/1012/400/300",
  note: 4,
});
await Rhum.create({
  name: "Clément Canne Bleue",
  description: "Rhum agricole blanc, Martinique, canne fraîche.",
  price: 29.0,
  labelId: moyen.id,
  originId: ecosse.id,
  supplierId: supplier1.id,
  typeId: (await ensureType("Blanc", { for_rhum: true })).id,
  userId: janeUser.id,
  photo: "https://picsum.photos/id/1012/400/300",
  note: 3,
});
await Rhum.create({
  name: "Neisson XO",
  description: "Rhum vieux agricole, boisé, épicé, fruits secs.",
  price: 85.0,
  labelId: excellent.id,
  originId: irlande.id,
  supplierId: supplier2.id,
  typeId: (await ensureType("Vieux", { for_rhum: true })).id,
  userId: adminUser.id,
  photo: "https://picsum.photos/id/1012/400/300",
  note: 5,
});

console.log("Ajout de bière de test...");
await Beer.create({
  name: "Punk IPA",
  description: "Bière craft écossaise",
  price: 3.5,
  labelId: moyen.id,
  originId: ecosse.id,
  supplierId: supplier1.id,
  typeId: (await ensureType("Punk IPA", { for_beer: true })).id,
  userId: adminUser.id,
  photo: "https://picsum.photos/id/1015/400/300",
  note: 3,
});

// Ajout de plusieurs bières (utilisation de ensureType partout)
await Beer.create({
  name: "Punk IPA",
  description: "Bière craft écossaise, houblonnée, agrumes.",
  price: 3.5,
  labelId: moyen.id,
  originId: ecosse.id,
  supplierId: supplier1.id,
  typeId: (await ensureType("IPA (India Pale Ale)", { for_beer: true })).id,
  userId: johnUser.id,
  photo: "https://picsum.photos/id/1015/400/300",
  note: 4,
});
await Beer.create({
  name: "Weihenstephaner Hefeweissbier",
  description: "Blanche allemande, banane, clou de girofle.",
  price: 2.8,
  labelId: bon.id,
  originId: irlande.id,
  supplierId: supplier2.id,
  typeId: (await ensureType("Hefeweizen", { for_beer: true })).id,
  userId: janeUser.id,
  photo: "https://picsum.photos/id/1015/400/300",
  note: 5,
});
await Beer.create({
  name: "Guinness Draught",
  description: "Stout irlandaise, crémeuse, torréfiée.",
  price: 3.2,
  labelId: moyen.id,
  originId: irlande.id,
  supplierId: supplier1.id,
  typeId: (await ensureType("Stout", { for_beer: true })).id,
  userId: adminUser.id,
  photo: "https://picsum.photos/id/1015/400/300",
  note: 2,
});
