import redis from './db/redis.js';
import { DateTime } from "luxon";
import { pick_movie_of_day } from './pick_movie_of_day.js';

export const check_if_movie = async () => {
    const today = DateTime.local().toISODate();
    const oneDayBefore = DateTime.local().minus({ days: 1 }).toISODate();
    
    const exists = await redis.exists(today);
    const dayBeforeExists = await redis.exists(oneDayBefore);

    if (!exists) {
        console.log('Picking movie of the day');
        pick_movie_of_day(today);
    }
    else {
        console.log('Movie of the day already selected.');
    }
    if (!dayBeforeExists) {
        console.log('Picking movie of the day before');
        pick_movie_of_day(oneDayBefore);
    }
    else {
        console.log('Movie of the day before already selected.');
    }
}