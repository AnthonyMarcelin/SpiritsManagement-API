import { DataTypes, Model } from "sequelize";

import sequelize from "../database/client.js";

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