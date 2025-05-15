import { getRandomReview } from "./functions/getRandomReview.js";
import redis from './db/redis.js';
import { DateTime } from "luxon";

export const pick_movie_of_day = async (date =  DateTime.local().toISODate()) => {
    try {
        const review = await getRandomReview(date);
        // const today = DateTime.local().toISODate(); 
        console.log(`Movie of date: ${date} is...`);
        console.log(review.link);
        await redis.set(date, JSON.stringify(review), 'EX', 259200);
    }
    catch (e) {
        console.log(e);
    }
}
