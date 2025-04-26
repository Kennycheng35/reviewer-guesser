"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_js_1 = __importDefault(require("../db/redis.js"));
const Movie_js_1 = require("../models/Movie.js");
class MovieService {
    constructor() {
        this.getMovieOfTheDay = async (date) => {
            console.log('date in service', date);
            // const formattedDate = date.toISOString().split('T')[0]; // "2025-04-25"
            const movie = await redis_js_1.default.get(date);
            console.log('movie returned', movie);
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
            const movies = await Movie_js_1.Movie.findAll();
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
exports.default = MovieService;
// const movieService = new MovieService();
// movieService.getAllMovieSuggestions().then(el => console.log(el));
// movieService.getMovieOfTheDay();
