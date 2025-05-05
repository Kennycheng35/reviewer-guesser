import { FastifyReply, FastifyRequest } from 'fastify';
import MovieService from "../services/MovieService.js";

class MovieController {

    private movieService: MovieService;

    constructor(){
        this.movieService = new MovieService();
    }

    getMovieOfTheDay = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
        const { date } = req.query as { date?: string };
        if (date) {
            const movie = await this.movieService.getMovieOfTheDay(date);
            return res.send(movie);
        }
    }

    getAllMovieSuggestions = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
        const movies = await this.movieService.getAllMovieSuggestions();
        return res.send(movies);
    }

}

export default MovieController;