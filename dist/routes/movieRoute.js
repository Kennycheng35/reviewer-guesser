"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoute = void 0;
const MovieController_1 = __importDefault(require("../controllers/MovieController"));
const movieRoute = async (fastify) => {
    const movieController = new MovieController_1.default();
    fastify.get('/movie', movieController.getMovieOfTheDay);
    fastify.get('/movieSuggestions', movieController.getAllMovieSuggestions);
};
exports.movieRoute = movieRoute;
