import { add_movie_poster } from "../../add_movie_poster.js"

export default {
    name: 'add_posters_to_movies',
    options: {
        repeat: { cron: '0 */6 * * *'}
    },
    handler: async (job) => {
        try {
            console.log(`${job.name} starting`);
            await add_movie_poster();  
            await add_movie_poster();    
            await add_movie_poster();        
        }
        catch (e) {
            console.log(e)
        }
    }
}