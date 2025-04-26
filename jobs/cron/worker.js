import { Worker } from 'bullmq';
import job_queue from '../db/job_queue.js';

import add_popular_movies_to_db from './jobs/add_popular_movies_to_db.js';
import add_reviews_for_movies from './jobs/add_reviews_for_movies.js';
import pick_new_movie_of_day from './jobs/pick_new_movie_of_day.js';
import add_posters_to_movies from './jobs/add_posters_to_movies.js';

const handlers = {
  [add_popular_movies_to_db.name]: add_popular_movies_to_db.handler,
  [add_reviews_for_movies.name]: add_reviews_for_movies.handler,
  [pick_new_movie_of_day.name]: pick_new_movie_of_day.handler,
  [add_posters_to_movies.name]: add_posters_to_movies.handler,
}
const worker = new Worker('job-queue', async (job) => {

  if (handlers[job.name]) {
    await handlers[job.name](job);
  }
  else {
    console.warn(`No handler for job: ${job.name}`);
  }
}, { connection: job_queue });

worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

  
worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err}`);
});