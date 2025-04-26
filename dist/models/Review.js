"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const db_js_1 = __importDefault(require("../db/db.js")); // Path to your sequelize instance
exports.Review = db_js_1.default.define('Review', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: sequelize_1.DataTypes.STRING
    },
    liked: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    review: {
        type: sequelize_1.DataTypes.TEXT
    },
    shown: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    difficulty: {
        type: sequelize_1.DataTypes.INTEGER
    },
    innerhtml: {
        type: sequelize_1.DataTypes.TEXT
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    play_date: {
        type: sequelize_1.DataTypes.DATE
    },
}, {
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
