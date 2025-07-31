import { Label, PeatLevel, Type } from "../models/associations.js";

console.log("Ajout des labels de référence...");
await Label.findOrCreate({ where: { name: "Excellent" }, defaults: { color: "#F00" } });
await Label.findOrCreate({ where: { name: "Bon" }, defaults: { color: "#0F0" } });
await Label.findOrCreate({ where: { name: "Moyen" }, defaults: { color: "#FF0" } });

console.log("Ajout des niveaux de tourbe...");
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
  peatLevels.map((name) => PeatLevel.findOrCreate({ where: { name } }))
);

console.log("Ajout des types de référence...");

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
  whiskyTypes.map((typeName) => Type.findOrCreate({ where: { name: typeName, forWhisky: true } }))
);

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
  rhumTypes.map((typeName) => Type.findOrCreate({ where: { name: typeName, forRhum: true } }))
);

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
  beerTypes.map((typeName) => Type.findOrCreate({ where: { name: typeName, forBeer: true } }))
);

console.log("Seeding neutre terminé !");
