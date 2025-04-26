"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const sequelize_1 = require("sequelize");
const db_js_1 = __importDefault(require("../db/db.js")); // Path to your sequelize instance
exports.Movie = db_js_1.default.define('Movie', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    poster: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'movies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
