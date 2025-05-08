import {Movie} from '../models/index.js';

export const addMovie = async (data) => {
    try {
        const movies = await Movie.bulkCreate(data, {ignoreDuplicates: true});
        console.log("Movies added:", movies);
        return movies;
    }
    catch (e) {
        console.log(e);
    }
}
