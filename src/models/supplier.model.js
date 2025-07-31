import { DataTypes, Model } from "sequelize";

import sequelize from "../database/client.js";

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