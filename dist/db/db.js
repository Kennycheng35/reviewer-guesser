"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set up your database connection (adjust credentials as needed)
const sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres', // Change this depending on your DB (mysql, postgres, sqlite, etc.)
    logging: false, // Set to true if you want to see the SQL queries
});
// const sequelize = new Sequelize('mydb', 'myuser', 'mypassword', {
//   host: 'localhost',
//   dialect: 'postgres', // Change this depending on your DB (mysql, postgres, sqlite, etc.)
//   logging: false, // Set to true if you want to see the SQL queries
// });
sequelize.authenticate()
    .then(() => console.log('Connection successful'))
    .catch((error) => console.error('Unable to connect to the database:', error));
exports.default = sequelize;
