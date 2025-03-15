import "dotenv/config";
import { Sequelize } from "@sequelize/core";
import { MariaDbDialect } from "@sequelize/mariadb";

const sequelize = new Sequelize({
    dialect: MariaDbDialect,
    database: 'test',
    user: `${process.env.USER_DB}`,
    password: `${process.env.PASSWORD_DB}`,
    host: '192.168.1.180',
    port: 3306,
    showWarnings: true,
    connectTimeout: 2000,
});

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;