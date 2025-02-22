import sequelize from "../database/pg.js";
import { DataTypes, Model } from "sequelize";

export default class Origin extends Model {}

Origin.init({
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "origin",
  }
);