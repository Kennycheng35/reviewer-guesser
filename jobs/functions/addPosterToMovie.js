import {Movie} from '../models/index.js';

export const addPosterToMovie = async (link, poster) => {
    try {
        const movie = await Movie.update(
            {poster},
            {where: {link}}
        );
        return movie;
    }
    catch (e) {
        console.log(e);
    }
}
