import "dotenv/config";
import { Sequelize } from "sequelize/core";
import { MariaDbDialect } from "@sequelize/mariadb";

const sequelize = new Sequelize({
    dialect: MariaDbDialect,
    database: 'spirits',
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    host: '192.168.1.180',
    port: 3306,
    showWarnings: true,
    connectTimeout: 1000,
});

export default sequelize;