import sequelize from "../database/client.js";
import { DataTypes, Model } from "sequelize";

export default class Label extends Model {}

Label.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "label",
  }
);