import { Whisky, Beer, Rhum, User, Origin, Supplier, Type, PeatLevel, Label } from "../../models/associations.js";

console.log("Suppression de toutes les données de toutes les tables...");

await Promise.all([
  Whisky.destroy({ where: {} }),
  Beer.destroy({ where: {} }),
  Rhum.destroy({ where: {} }),
  Origin.destroy({ where: {} }),
  Supplier.destroy({ where: {} }),
  User.destroy({ where: {} }),
  Type.destroy({ where: {} }),
  PeatLevel.destroy({ where: {} }),
  Label.destroy({ where: {} })
]);

console.log("Purge totale terminée. Toutes les tables sont vides.");
