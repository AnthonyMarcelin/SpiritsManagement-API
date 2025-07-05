import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

class PeatLevel extends Model {}

PeatLevel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PeatLevel",
    tableName: "peat_levels",
    timestamps: false,
  },
);

export default PeatLevel;
