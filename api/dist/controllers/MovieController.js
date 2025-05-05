import MovieService from "../services/MovieService.js";
class MovieController {
    constructor() {
        this.getMovieOfTheDay = async (req, res) => {
            const { date } = req.query;
            if (date) {
                const movie = await this.movieService.getMovieOfTheDay(date);
                return res.send(movie);
            }
        };
        this.getAllMovieSuggestions = async (req, res) => {
            const movies = await this.movieService.getAllMovieSuggestions();
            return res.send(movies);
        };
        this.movieService = new MovieService();
    }
}
export default MovieController;
