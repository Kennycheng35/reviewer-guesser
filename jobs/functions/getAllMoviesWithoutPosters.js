import {Review} from '../models/index.js';
import {Movie} from '../models/index.js';

export const getAllMoviesWithoutPoster = async () => {
    try {
        const movies = await Movie.findAll({
            where: {
                poster: null
            }
        });
        return movies;
    }
    catch (e) {
        console.log(e);
    }


}
