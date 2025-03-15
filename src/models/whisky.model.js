import sequelize from "../database/client.js";
import { DataTypes, Model } from "sequelize";


export default class Whisky extends Model {}

Whisky.init({
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
        allowNull: true, // mettre en false
    },
    nature: {
        type: DataTypes.CHAR,
        allowNull: true, // mettre en false
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
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "whisky",
  }
);