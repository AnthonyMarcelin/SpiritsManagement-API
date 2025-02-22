import sequelize from "../database/pg.js";
import { DataTypes, Model } from "sequelize";

export default class Gender extends Model {}

Gender.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "gender",
  }
);