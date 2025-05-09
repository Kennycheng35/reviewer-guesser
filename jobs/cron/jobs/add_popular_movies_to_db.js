import { add_letterboxd_movies } from '../../scrapers/add_letterboxd_movies.js';
import { addMovie } from '../../functions/addMovie.js';
import dotenv from 'dotenv';

dotenv.config();

export default {
    name: 'add_popular_movies_to_db',
    options: {
        repeat: { cron: '0 0,12 * * *'},
        // repeat: { cron: '*/5 * * * *'},
        jobId: 'add-popular-movies'

        // repeat: { cron: '0 1 * * 0'}
    },
    handler: async (job) => {
        try {            
            const url = process.env.URL;
            console.log(`${job.name} starting`);
            console.log(url);
            add_letterboxd_movies(url).then((moviesToAdd) => {
                if (moviesToAdd && moviesToAdd.length)
                    addMovie(moviesToAdd.filter(el => el.title));
            });
            
            for (let x=2; x<=10; x++) {
                add_letterboxd_movies(`${url}/page/${x}`).then((moviesToAdd) => {
                    if (moviesToAdd && moviesToAdd.length)
                        addMovie(moviesToAdd);
                });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}