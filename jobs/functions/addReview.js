import {Review} from '../models/index.js';

export const addReview = async (data) => {
    try {
        const reviews = await Review.bulkCreate(data);
        return reviews;
    }
    catch (e) {
        console.log(e);
    }

}

