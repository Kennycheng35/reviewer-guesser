import redis from "../db/redis.js";
import { Movie } from "../models/Movie.js";

type Review = {
    id: number,
    review: string,
    rating: string,
    innerhtml: string,
    liked: boolean,
    difficulty: number
}

type Movie = {
    title: string,
    id: string,
    link: string,
    poster: string,
    reviews: Review[]
}

type MovieSuggestions = {
    title: string,
    link: string,
}


export default class MovieService {
    getMovieOfTheDay = async (date: string): Promise<Movie | {}> => {
        console.log('date in service',date);
        // const formattedDate = date.toISOString().split('T')[0]; // "2025-04-25"
        const movie = await redis.get(date);
        console.log('movie returned', movie);
        if (movie) {
            const parsedMovie = JSON.parse(movie);
            const {
                title,
                id,
                link,
                poster
            } = parsedMovie;
            const reviews = JSON.parse(parsedMovie.reviews);
            return  {
                title,
                id,
                link,
                poster,
                reviews
            }
        }
        return {}
    }

    getAllMovieSuggestions = async (): Promise<MovieSuggestions[]> => {
        const movies = await Movie.findAll();
        const movieSuggestions = movies.map((el: any) => {
            return {
                title: el.dataValues.title,
                link: el.dataValues.link
            }
        })
        return movieSuggestions
    }
}
