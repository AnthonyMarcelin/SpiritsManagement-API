import sequelize from "../database/pg.js";
import { DataTypes, Model } from "sequelize";

export default class Supplier extends Model {}

Supplier.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "supplier",
  }
);