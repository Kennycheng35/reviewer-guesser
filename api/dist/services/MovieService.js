import redis from "../db/redis.js";
import { Movie } from "../models/Movie.js";
export default class MovieService {
    constructor() {
        this.getMovieOfTheDay = async (date) => {
            // const formattedDate = date.toISOString().split('T')[0]; // "2025-04-25"
            const movie = await redis.get(date);
            if (movie) {
                const parsedMovie = JSON.parse(movie);
                const { title, id, link, poster } = parsedMovie;
                const reviews = JSON.parse(parsedMovie.reviews);
                return {
                    title,
                    id,
                    link,
                    poster,
                    reviews
                };
            }
            return {};
        };
        this.getAllMovieSuggestions = async () => {
            const movies = await Movie.findAll();
            const movieSuggestions = movies.map((el) => {
                return {
                    title: el.dataValues.title,
                    link: el.dataValues.link
                };
            });
            return movieSuggestions;
        };
    }
}
