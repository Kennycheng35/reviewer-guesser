import {Movie} from '../models/index.js';

export const addMovie = async (data) => {
    try {
        const movies = await Movie.bulkCreate(data, {ignoreDuplicates: true});
        return movies;
    }
    catch (e) {
        console.log(e);
    }
}
