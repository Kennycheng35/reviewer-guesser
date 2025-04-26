import { getAllMoviesWithoutPoster } from './functions/getAllMoviesWithoutPosters.js';
import { get_poster_url } from './scrapers/get_poster_url.js';
import { addPosterToMovie } from './functions/addPosterToMovie.js';

import dotenv from 'dotenv';

dotenv.config();

export const add_movie_poster = async () => {
    try {
        const movies = await getAllMoviesWithoutPoster();
        
        if (movies.length > 0) {
            const index = Math.floor(Math.random() * movies.length);
            const posterLink = await get_poster_url(`${process.env.BASEURL}${movies[index].link}`);
            const movie = await addPosterToMovie(movies[index].link, posterLink);
            return movie;

        }
        else {
            console.log('No posters need to be added');
        }
    }
    catch(e) {
        console.log(e);
    }
    
}

