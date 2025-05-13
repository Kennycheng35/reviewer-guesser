// import { pick_movie_of_day } from "../../pick_movie_of_day.js";
import { check_if_movie } from "../../check_if_movie.js";

export default {
    name: 'pick_new_movie_of_day',
    options: {
        repeat: { cron: '0 0,1,2 * * *'},
        jobId: 'pick-new-movie'
    },
    handler: async (job) => {
        try {
            console.log(`${job.name} starting`);
            await check_if_movie();    
        }
        catch (e) {
            console.log(e)
        }
    }
}