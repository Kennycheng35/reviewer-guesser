import { getRandomReview } from "./functions/getRandomReview.js";
import redis from './db/redis.js';
import { DateTime } from "luxon";

export const pick_movie_of_day = async (date =  DateTime.local().toISODate()) => {
    try {
        const review = await getRandomReview();
        // const today = DateTime.local().toISODate(); 

        await redis.set(date, JSON.stringify(review), 'EX', 259200);

        redis.disconnect(); 
    }
    catch (e) {
        console.log(e);
    }
}
