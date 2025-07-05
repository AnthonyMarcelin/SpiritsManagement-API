import sequelize from "../database/client.js";
import { DataTypes, Model } from "sequelize";

export default class Whisky extends Model {}

Whisky.init(
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nature_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "whisky",
  },
);
