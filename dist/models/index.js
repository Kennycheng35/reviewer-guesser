"use strict";
// const sequelize = require('../db');
// const DataTypes = require('sequelize');
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.Review = exports.Movie = void 0;
const Movie_js_1 = require("./Movie.js");
Object.defineProperty(exports, "Movie", { enumerable: true, get: function () { return Movie_js_1.Movie; } });
const Review_js_1 = require("./Review.js");
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return Review_js_1.Review; } });
const History_js_1 = require("./History.js");
Object.defineProperty(exports, "History", { enumerable: true, get: function () { return History_js_1.History; } });
Movie_js_1.Movie.hasMany(Review_js_1.Review, {
    sourceKey: 'link', // Movie.link
    foreignKey: 'link', // Review.link
    as: 'reviews' // alias to use in `include`
});
Review_js_1.Review.belongsTo(Movie_js_1.Movie, {
    targetKey: 'link', // Movie.link
    foreignKey: 'link', // Review.link
    as: 'movie'
});
History_js_1.History.belongsTo(Movie_js_1.Movie, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'movie'
});
// A Movie has many History records (one movie can appear in many histories)
Movie_js_1.Movie.hasMany(History_js_1.History, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'histories'
});
