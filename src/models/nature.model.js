import sequelize from "../database/client.js";
import { DataTypes, Model } from "sequelize";

export default class Nature extends Model {}

Nature.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "nature",
  }
);