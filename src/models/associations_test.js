import sequelize from "../database/pg.js";
import Whisky from "./whisky.model.js";
import Rhum from "./rhum.model.js";
import Beer from "./beer.model.js";
import Label from "./label.model.js";
import Supplier from "./supplier.model.js";
// import Type from "./type.model.js";

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
    as: "label",
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
    as: "label",
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
    as: "label",
});

// // whisky - type
// Type.hasMany(Whisky, {
//     foreignKey: {
//         name: "type_id",
//         allowNull: false,
//     },
//     as: "whiskies",
// });

// Whisky.belongsTo(Type, {
//     foreignKey: "type_id",
//     as: "type",
// });

// // rhum - type
// Type.hasMany(Rhum, {
//     foreignKey: {
//         name: "type_id",
//         allowNull: false,
//     },
//     as: "rhums",
// });

// Rhum.belongsTo(Type, {
//     foreignKey: "type_id",
//     as: "type",
// });

// // beer - type
// Type.hasMany(Beer, {
//     foreignKey: {
//         name: "type_id",
//         allowNull: false,
//     },
//     as: "beers",
// });

// Beer.belongsTo(Type, {
//     foreignKey: "type_id",
//     as: "type",
// });

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
    as: "supplier",
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
    as: "supplier",
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
    as: "supplier",
});

export { sequelize, Whisky, Beer, Rhum, Label, Supplier };
