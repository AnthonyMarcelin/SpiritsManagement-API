import sequelize from "../database/pg.js";
import Whisky from "./whisky.model.js";
import Rhum from "./rhum.model.js";
import Beer from "./beer.model.js";
import Label from "./label.model.js";
import Supplier from "./supplier.model.js";
import Type from "./type.model.js";


// whisky - label

Label.hasMany(Whisky, {
    foreignKey: {
        name: "label_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsTo(Label, {
    foreignKey: "label_id",
    as: "labels",
});

// rhum - label

Label.hasMany(Rhum, {
    foreignKey: {
        name: "label_id",
        allowNull: false,
    },
    as: "rhums",
});

Rhum.belongsTo(Label, {
    foreignKey: "label_id",
    as: "labels",
});

// beer - label

Label.hasMany(Beer, {
    foreignKey: {
        name: "label_id",
        allowNull: false,
    },
    as: "beers",
});

Beer.belongsTo(Label, {
    foreignKey: "label_id",
    as: "labels",
});


// whisky - type

Type.hasMany(Whisky, {
    foreignKey: {
        name: "type_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsTo(Type, {
    foreignKey: "type_id",
    as: "types",
});

// rhum - type

Type.hasMany(Rhum, {
    foreignKey: {
        name: "type_id",
        allowNull: false,
    },
    as: "rhums",
});

Rhum.belongsTo(Type, {
    foreignKey: "type_id",
    as: "types",
});

// beer - type

Type.hasMany(Beer, {
    foreignKey: {
        name: "type_id",
        allowNull: false,
    },
    as: "beers",
});

Whisky.belongsTo(Type, {
    foreignKey: "type_id",
    as: "types",
});

// whisky - supplier

Supplier.hasMany(Whisky, {
    foreignKey: {
        name: "supplier_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsToMany(Supplier, {
    foreignKey: "supplier_id",
    as: "suppliers",
});

// rhum - supplier

Supplier.hasMany(Rhum, {
    foreignKey: {
        name: "supplier_id",
        allowNull: false,
    },
    as: "rhums",
});

Rhum.belongsToMany(Supplier, {
    foreignKey: "supplier_id",
    as: "rhums",
});

// beer - supplier

Supplier.hasMany(Beer, {
    foreignKey: {
        name: "supplier_id",
        allowNull: false,
    },
    as: "beers",
});

Beer.belongsToMany(Supplier, {
    foreignKey: "supplier_id",
    as: "suppliers",
});

export { sequelize, Whisky, Beer, Rhum, Label, Type, Supplier};