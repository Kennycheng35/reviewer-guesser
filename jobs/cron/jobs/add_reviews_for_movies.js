import { add_reviews_for_each_movie } from "../../add_reviews_for_each_movie.js"

export default {
    name: 'add_reviews_for_movies',
    options: {
        // repeat: { cron: '0 0 * * *'}
        repeat: { cron: '0 */6 * * *'}

    },
    handler: async (job) => {
        try {
            console.log(`${job.name} starting`);
            await add_reviews_for_each_movie();    
        }
        catch (e) {
            console.log(e)
        }
    }
}