import sequelize from "../database/client.js";
import { DataTypes, Model } from "sequelize";

export default class Rhum extends Model {}

Rhum.init({
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
    gender: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    origin: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "rhum",
  }
);