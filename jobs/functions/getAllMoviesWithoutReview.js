import {Review} from '../models/index.js';
import {Movie} from '../models/index.js';
import { Sequelize } from 'sequelize';


export const getAllMoviesWithoutReview = async () => {
    try {
        const movies = await Movie.findAll({
        attributes: ['link', 'title'],
        include: [
            {
                model: Review,
                as: 'reviews',
                required: false,
            }
        ],
        where: Sequelize.where(Sequelize.col('reviews.link'), 'IS', null)
    })

    return movies.map(movie => {
        return {
            link: movie.dataValues.link,
            title: movie.dataValues.title.replace(/\s*\([^)]*\)/g, '')
        }
    });
    }
    catch(e) {
        console.log(e);
    }
}
