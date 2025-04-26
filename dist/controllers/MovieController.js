"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieService_1 = __importDefault(require("../services/MovieService"));
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
        this.movieService = new MovieService_1.default();
    }
}
exports.default = MovieController;
