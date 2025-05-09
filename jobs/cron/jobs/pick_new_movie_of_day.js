import { pick_movie_of_day } from "../../pick_movie_of_day.js";

export default {
    name: 'pick_new_movie_of_day',
    options: {
        repeat: { cron: '0 0 * * *'},
        jobId: 'pick-new-movie'
    },
    handler: async (job) => {
        try {
            console.log(`${job.name} starting`);
            await pick_movie_of_day();    
        }
        catch (e) {
            console.log(e)
        }
    }
}