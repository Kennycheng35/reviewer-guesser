import {Movie} from './Movie.js';
import {Review} from './Review.js';
import {History} from './History.js';

Movie.hasMany(Review, {
    sourceKey: 'link',    
    foreignKey: 'link',    
    as: 'reviews'          
});

Review.belongsTo(Movie, {
    targetKey: 'link',     
    foreignKey: 'link',   
    as: 'movie'
});

History.belongsTo(Movie, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'movie'
});

Movie.hasMany(History, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'histories'
});

export { Movie, Review, History };