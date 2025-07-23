import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

export default class Beer extends Model {}

Beer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
     note: {
      type: DataTypes.DECIMAL(3, 1), // 0 à 10, un chiffre après la virgule
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    originId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'origin_id',
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'supplier_id',
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'label_id',
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'type_id',
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'gender_id',
    },
    natureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'nature_id',
    },
  },
  {
    sequelize,
    tableName: "beer",
  },
);
