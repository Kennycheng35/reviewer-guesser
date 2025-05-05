import { FastifyInstance } from 'fastify';
import MovieController from '../controllers/MovieController.js';

export const movieRoute = async (fastify: FastifyInstance) => {
    const movieController = new MovieController();

    fastify.get('/movie', movieController.getMovieOfTheDay);
    fastify.get('/movieSuggestions', movieController.getAllMovieSuggestions);
}