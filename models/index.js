// const sequelize = require('../db');
// const DataTypes = require('sequelize');

import {Movie} from './Movie.js';
import {Review} from './Review.js';
import {History} from './History.js';

Movie.hasMany(Review, {
    sourceKey: 'link',     // Movie.link
    foreignKey: 'link',    // Review.link
    as: 'reviews'           // alias to use in `include`
});

Review.belongsTo(Movie, {
    targetKey: 'link',     // Movie.link
    foreignKey: 'link',    // Review.link
    as: 'movie'
});

History.belongsTo(Movie, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'movie'
});

// A Movie has many History records (one movie can appear in many histories)
Movie.hasMany(History, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'histories'
});


// console.log(Movie.associations);
// console.log(Review.associations);


export { Movie, Review, History };