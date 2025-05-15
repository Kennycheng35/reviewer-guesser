import redis from './db/redis.js';
import { DateTime } from "luxon";
import { pick_movie_of_day } from './pick_movie_of_day.js';

export const check_if_movie = async () => {
    try {
        const today = DateTime.local().toISODate();
        const oneDayBefore = DateTime.local().minus({ days: 1 }).toISODate();
        const oneDayAfter = DateTime.local().plus({ days: 1 }).toISODate();

        const exists = await redis.exists(today);
        const dayBeforeExists = await redis.exists(oneDayBefore);
        const dayAfterExists = await redis.exists(oneDayAfter);

        if (exists !== 1) {
            console.log(`Picking movie of the day: ${today}`);
            pick_movie_of_day(today);
        }
        else {
            console.log('Movie of the day already selected.');
        }
        if (dayBeforeExists !== 1) {
            console.log(`Picking movie of the day before ${oneDayBefore}`);
            pick_movie_of_day(oneDayBefore);
        }
        else {
            console.log('Movie of the day before already selected.');
        }
        if (dayAfterExists !== 1) {
            console.log(`Picking movie of the day after ${oneDayAfter}`);
            pick_movie_of_day(oneDayAfter);
        }
        else {
            console.log('Movie of the day after already selected.');
        }
    }
    catch (e) {
        console.log('There was an error picking movies');
    }
}