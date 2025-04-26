"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const sequelize_1 = require("sequelize");
const db_js_1 = __importDefault(require("../db/db.js")); // Path to your sequelize instance
exports.History = db_js_1.default.define('History', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
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
    play_date: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'history',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
