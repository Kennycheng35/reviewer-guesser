import {Movie} from '../models/index.js';

export const addMovie = async (data) => {
    try {
        const movies = await Movie.bulkCreate(data, {ignoreDuplicates: true});
        if (movies && movies.length !== 0)
            console.log('Movies succcesfully inserted');
        return movies;
    }
    catch (e) {
        console.log(e);
    }
}
