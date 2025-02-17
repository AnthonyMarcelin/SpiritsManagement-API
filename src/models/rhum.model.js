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
    type: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "rhum",
  }
);