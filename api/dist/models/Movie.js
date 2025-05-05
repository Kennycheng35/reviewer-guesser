import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js'; // Path to your sequelize instance
export const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    poster: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'movies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
