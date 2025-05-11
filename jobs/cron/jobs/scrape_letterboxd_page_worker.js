// Assume add_letterboxd_movies and addMovie are available
import { add_letterboxd_movies } from './scrapers/add_letterboxd_movies';
import { addMovie } from '../db/movieService'; // Or however you import them

export default {
    name: 'scrape_single_letterboxd_page',
    options: {
        // No repeat options here, it's scheduled on-demand with delay
        // attempts: 3, // Optional: retry a few times on failure
        // backoff: { type: 'exponential', delay: 60000 } // Optional: backoff strategy
    },
    handler: async (job) => {
        const { pageUrl, pageNumber } = job.data; // Expecting URL to be passed in job data
        try {
            if (!pageUrl) {
                console.error(`${job.name} failed: pageUrl not provided in job data.`);
                return;
            }
            console.log(`${job.name} starting for page ${pageNumber}: ${pageUrl}`);

            const moviesToAdd = await add_letterboxd_movies(pageUrl);
            if (moviesToAdd && moviesToAdd.length) {
                await addMovie(moviesToAdd.filter(el => el && el.title));
                console.log(`${job.name} completed for ${pageUrl}. Added ${moviesToAdd.length} potential movies.`);
            } else {
                console.log(`${job.name} completed for ${pageUrl}. No movies found or returned.`);
            }
        } catch (e) {
            console.error(`${job.name} failed for ${pageUrl}:`, e);
            throw e; // Re-throw to allow for retries if configured
        }
    }
};