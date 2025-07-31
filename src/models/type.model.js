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
    forWhisky: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'for_whisky',
    },
    forRhum: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'for_rhum',
    },
    forBeer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'for_beer',
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
