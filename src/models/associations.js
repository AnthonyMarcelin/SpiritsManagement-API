import sequelize from "../database/pg.js";
import Whisky from "./whisky.model.js";
import Rhum from "./rhum.model.js";
import Beer from "./beer.model.js";
import Label from "./label.model.js";
import Supplier from "./supplier.model.js";
import Gender from "./gender.model.js";
import Nature from "./nature.model.js";
import Origin from "./origin.model.js";


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

// whisky - origin

Origin.hasMany(Whisky, {
    foreignKey: {
        name: "origin_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsTo(Origin, {
    foreignKey: "origin_id",
    as: "origins",
});

// rhum - origin

Origin.hasMany(Rhum, {
    foreignKey: {
        name: "origin_id",
        allowNull: false,
    },
    as: "rhums",
});

Rhum.belongsTo(Origin, {
    foreignKey: "origin_id",
    as: "origins",
});

// beer - origin

Origin.hasMany(Beer, {
    foreignKey: {
        name: "origin_id",
        allowNull: false,
    },
    as: "beers",
});

Beer.belongsTo(Origin, {
    foreignKey: "origin_id",
    as: "origins",
});

// whisky - gender

Gender.hasMany(Whisky, {
    foreignKey: {
        name: "gender_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsTo(Gender, {
    foreignKey: "gender_id",
    as: "genders",
});

// rhum - gender

Gender.hasMany(Rhum, {
    foreignKey: {
        name: "gender_id",
        allowNull: false,
    },
    as: "rhums",
});

Rhum.belongsTo(Gender, {
    foreignKey: "gender_id",
    as: "genders",
});

// beer - gender

Gender.hasMany(Beer, {
    foreignKey: {
        name: "gender_id",
        allowNull: false,
    },
    as: "beers",
});

Beer.belongsTo(Gender, {
    foreignKey: "gender_id",
    as: "genders",
});

// whisky - supplier

Supplier.hasMany(Whisky, {
    foreignKey: {
        name: "supplier_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsTo(Supplier, {
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

Rhum.belongsTo(Supplier, {
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

Beer.belongsTo(Supplier, {
    foreignKey: "supplier_id",
    as: "suppliers",
});

// whisky - nature

Nature.hasMany(Whisky, {
    foreignKey: {
        name: "nature_id",
        allowNull: false,
    },
    as: "whiskies",
});

Whisky.belongsTo(Nature, {
    foreignKey: "nature_id",
    as: "natures",
});

export { sequelize, Whisky, Beer, Rhum, Gender, Nature, Label, Supplier, Origin};