import {getAllMoviesWithoutReview}  from './functions/getAllMoviesWithoutReview.js';
import { add_letterboxd_reviews } from './scrapers/add_letterboxd_reviews.js';
import {addReview} from './functions/addReview.js';

import dotenv from 'dotenv';

dotenv.config();

const grabAllReviews = async (film, name) => {
    const url1 = `${process.env.BASEURL}${film}reviews/by/activity/`;
    const url2 = `${process.env.BASEURL}${film}reviews/by/activity/page/10/`;

    try {
        const reviewBatch1 = await add_letterboxd_reviews(url1, film, name, 1);
        const reviewBatch2 = await add_letterboxd_reviews(url2, film, name, 2);
        if ((!reviewBatch1 && !reviewBatch2) || (!reviewBatch1.length) && (!reviewBatch2.length))
            return
        return [...reviewBatch1, ...reviewBatch2];
    }
    catch (e) {
        console.log(e);
    }
}

const insertReviewsIntoDb = async (film, name) => {
    try {
        console.log(film, name)
        const reviews = await grabAllReviews(film, name);
        console.log('reviews gotten');
        console.log(reviews);
        const result = await addReview(reviews);        
        console.log('Reviews have been successfully added');

        return result;
    }
    catch (e) {
        console.log(e);
    }
}

export const add_reviews_for_each_movie = async () => {
    try {
        const movies = await getAllMoviesWithoutReview();

        if (movies.length > 0) {
            const index = Math.floor(Math.random() * movies.length);
            console.log(index);
            const reviews = await insertReviewsIntoDb(movies[index].link, movies[index].title);
        
            return reviews;
        }
        else {
            console.log('No reviews need to be added');
        }
    }
    catch(e){
        console.log(e);
    }

}

