import sequelize from "../database/client.js";
import Whisky from "./whisky.model.js";
import Rhum from "./rhum.model.js";
import Beer from "./beer.model.js";
import Label from "./label.model.js";
import Supplier from "./supplier.model.js";
import PeatLevel from "./peatLevel.model.js";
import Type from "./type.model.js";
import Origin from "./origin.model.js";

// Associations centralisées

Label.hasMany(Whisky, {
  foreignKey: {
    name: "label_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Label, {
  foreignKey: "label_id",
  as: "label",
});
Label.hasMany(Rhum, {
  foreignKey: {
    name: "label_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Label, {
  foreignKey: "label_id",
  as: "label",
});
Label.hasMany(Beer, {
  foreignKey: {
    name: "label_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Label, {
  foreignKey: "label_id",
  as: "label",
});
Origin.hasMany(Whisky, {
  foreignKey: {
    name: "origin_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Origin, {
  foreignKey: "origin_id",
  as: "origin",
});
Origin.hasMany(Rhum, {
  foreignKey: {
    name: "origin_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Origin, {
  foreignKey: "origin_id",
  as: "origin",
});
Origin.hasMany(Beer, {
  foreignKey: {
    name: "origin_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Origin, {
  foreignKey: "origin_id",
  as: "origin",
});
// --- PEAT LEVEL UNIQUEMENT POUR WHISKY ---
PeatLevel.hasMany(Whisky, {
  foreignKey: {
    name: "peat_level_id",
    allowNull: true,
  },
  as: "whiskies",
});
Whisky.belongsTo(PeatLevel, {
  foreignKey: "peat_level_id",
  as: "peat_level",
});
// --- TYPE POUR TOUS MAIS FILTRAGE PAR for_whisky, for_rhum, for_beer ---
Type.hasMany(Whisky, {
  foreignKey: {
    name: "type_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
});
Type.hasMany(Rhum, {
  foreignKey: {
    name: "type_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
});
Type.hasMany(Beer, {
  foreignKey: {
    name: "type_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
});
Supplier.hasMany(Whisky, {
  foreignKey: {
    name: "supplier_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  as: "supplier",
});
Supplier.hasMany(Rhum, {
  foreignKey: {
    name: "supplier_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  as: "supplier",
});
Supplier.hasMany(Beer, {
  foreignKey: {
    name: "supplier_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  as: "supplier",
});

export {
  sequelize,
  Whisky,
  Beer,
  Rhum,
  PeatLevel,
  Type,
  Label,
  Supplier,
  Origin,
};
