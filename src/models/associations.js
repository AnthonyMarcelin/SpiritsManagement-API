import sequelize from "../database/client.js";
import Whisky from "./whisky.model.js";
import Rhum from "./rhum.model.js";
import Beer from "./beer.model.js";
import Label from "./label.model.js";
import Supplier from "./supplier.model.js";
import PeatLevel from "./peatLevel.model.js";
import Type from "./type.model.js";
import Origin from "./origin.model.js";
import User from "./user.model.js";


Label.hasMany(Whisky, {
  foreignKey: {
    name: "labelId",
    field: "label_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Label, {
  foreignKey: { name: "labelId", field: "label_id" },
  as: "label",
});
Label.hasMany(Rhum, {
  foreignKey: {
    name: "labelId",
    field: "label_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Label, {
  foreignKey: { name: "labelId", field: "label_id" },
  as: "label",
});
Label.hasMany(Beer, {
  foreignKey: {
    name: "labelId",
    field: "label_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Label, {
  foreignKey: { name: "labelId", field: "label_id" },
  as: "label",
});
Origin.hasMany(Whisky, {
  foreignKey: {
    name: "originId",
    field: "origin_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Origin, {
  foreignKey: { name: "originId", field: "origin_id" },
  as: "origin",
});
Origin.hasMany(Rhum, {
  foreignKey: {
    name: "originId",
    field: "origin_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Origin, {
  foreignKey: { name: "originId", field: "origin_id" },
  as: "origin",
});
Origin.hasMany(Beer, {
  foreignKey: {
    name: "originId",
    field: "origin_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Origin, {
  foreignKey: { name: "originId", field: "origin_id" },
  as: "origin",
});
// --- PEAT LEVEL FOR WHISKY ---
PeatLevel.hasMany(Whisky, {
  foreignKey: {
    name: "peatLevelId",
    field: "peat_level_id",
    allowNull: true,
  },
  as: "whiskies",
});
Whisky.belongsTo(PeatLevel, {
  foreignKey: { name: "peatLevelId", field: "peat_level_id" },
  as: "peatLevel",
});
// --- FILTERED BY ALCOHOL TYPE ---
Type.hasMany(Whisky, {
  foreignKey: {
    name: "typeId",
    field: "type_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Type, {
  foreignKey: { name: "typeId", field: "type_id" },
  as: "type",
});
Type.hasMany(Rhum, {
  foreignKey: {
    name: "typeId",
    field: "type_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Type, {
  foreignKey: { name: "typeId", field: "type_id" },
  as: "type",
});
Type.hasMany(Beer, {
  foreignKey: {
    name: "typeId",
    field: "type_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Type, {
  foreignKey: { name: "typeId", field: "type_id" },
  as: "type",
});
Supplier.hasMany(Whisky, {
  foreignKey: {
    name: "supplierId",
    field: "supplier_id",
    allowNull: false,
  },
  as: "whiskies",
});
Whisky.belongsTo(Supplier, {
  foreignKey: { name: "supplierId", field: "supplier_id" },
  as: "supplier",
});
Supplier.hasMany(Rhum, {
  foreignKey: {
    name: "supplierId",
    field: "supplier_id",
    allowNull: false,
  },
  as: "rhums",
});
Rhum.belongsTo(Supplier, {
  foreignKey: { name: "supplierId", field: "supplier_id" },
  as: "supplier",
});
Supplier.hasMany(Beer, {
  foreignKey: {
    name: "supplierId",
    field: "supplier_id",
    allowNull: false,
  },
  as: "beers",
});
Beer.belongsTo(Supplier, {
  foreignKey: { name: "supplierId", field: "supplier_id" },
  as: "supplier",
});

User.hasMany(Whisky, { foreignKey: "userId", as: "whiskies", onDelete: "CASCADE" });
Whisky.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Rhum, { foreignKey: "userId", as: "rhums", onDelete: "CASCADE" });
Rhum.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Beer, { foreignKey: "userId", as: "beers", onDelete: "CASCADE" });
Beer.belongsTo(User, { foreignKey: "userId", as: "user" });

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
  User,
};
