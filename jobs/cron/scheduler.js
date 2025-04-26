import jobQueue  from './queue.js';
import add_popular_movies_to_db from './jobs/add_popular_movies_to_db.js';
import add_reviews_for_movies from './jobs/add_reviews_for_movies.js';
import pick_new_movie_of_day from './jobs/pick_new_movie_of_day.js';
import add_posters_to_movies from './jobs/add_posters_to_movies.js';

const jobs = [
  add_popular_movies_to_db,
  add_reviews_for_movies,
  add_posters_to_movies,
  pick_new_movie_of_day
];

(async () => {
    for (const job of jobs) {
      await jobQueue.add(job.name, {}, job.options);
      console.log(`Scheduled ${job.name}`);
    }
})();
  