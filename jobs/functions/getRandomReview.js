import {Review} from '../models/index.js';
import {Movie} from '../models/index.js';
import {History} from '../models/index.js';

import { Sequelize, fn, col } from 'sequelize';

export const getRandomReview = async (date) => {
    try {
        const movies = await Movie.findAll({
            attributes: ['id'],
            include: [
                {
                model: Review,
                as: 'reviews',
                where: { shown: false },
                attributes: [],
                },
            ],
            group: ['Movie.id'],
            having: Sequelize.where(fn('COUNT', col('reviews.id')), '>=', 4),
            raw: true,
        });
        if (movies) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovieId = movies[randomIndex].id;

            const randomMovie = await Movie.findOne({
                where: { id: randomMovieId },
                attributes: ['id', 'title', 'link', 'poster'],
                include: [
                    {
                    model: Review,
                    as: 'reviews',
                    where: { shown: false },
                    required: true,
                    attributes: ['id', 'review', 'rating', 'innerhtml', 'liked', 'difficulty'],
                    order: [['id', 'DESC']], 
                    limit: 4,
                    },
                ],
            });

        
            const movieId = randomMovie.id;        
            const { title, link, reviews, poster} = randomMovie;

            const history = await History.create({
                movie_id: movieId,
                title,
                link,
                play_date: date
            });
        
            const reviewsToUpdate = randomMovie.reviews.map(el => el.dataValues.id);

            const updateShownFlag = await Review.update(
            {shown: true, play_date: Sequelize.literal('CURRENT_DATE')},
            {
                where: {
                    id: reviewsToUpdate
                }
            }
            );
            return {
                id: movieId,
                title,
                link,
                poster,
                reviews: JSON.stringify(reviews)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}
