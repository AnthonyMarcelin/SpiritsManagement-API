import sequelize from "../database/pg.js";
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