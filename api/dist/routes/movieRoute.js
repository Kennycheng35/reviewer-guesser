import MovieController from '../controllers/MovieController.js';
export const movieRoute = async (fastify) => {
    const movieController = new MovieController();
    fastify.get('/movie', movieController.getMovieOfTheDay);
    fastify.get('/movieSuggestions', movieController.getAllMovieSuggestions);
};
