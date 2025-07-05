import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

class Type extends Model {}

Type.init(
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
    for_whisky: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    for_rhum: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    for_beer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Type",
    tableName: "types",
    timestamps: false,
  },
);

export default Type;
