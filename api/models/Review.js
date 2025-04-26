import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js'; // Path to your sequelize instance

export const Review = sequelize.define(
    'Review',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.STRING
        },
        liked: {
            type: DataTypes.BOOLEAN
        },
        review: {
            type: DataTypes.TEXT
        },
        shown: {
            type: DataTypes.BOOLEAN
        },
        difficulty: {
            type: DataTypes.INTEGER
        },
        innerhtml: {
            type: DataTypes.TEXT
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        play_date: {
            type: DataTypes.DATE
        },
    },
    {
        tableName: 'reviews',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)
