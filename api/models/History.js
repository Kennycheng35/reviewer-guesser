import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js'; 

export const History = sequelize.define(
    'History',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        play_date: {
            type: DataTypes.DATE
        }

    },
    {
        tableName: 'history',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

)