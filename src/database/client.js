import "dotenv/config";
import { Sequelize } from "sequelize";

const dbUrl = process.env.PG_URL || process.env.PG_URL_DOCKER || process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
  define: {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

try {

  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

} catch (error) {

  console.error("Unable to connect to the database:", error);

}

export default sequelize;
