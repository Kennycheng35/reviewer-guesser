
import jobQueue from './queue.js';

// import add_popular_movies_to_db from './jobs/add_popular_movies_to_db.js'; 
import add_reviews_for_movies from './jobs/add_reviews_for_movies.js';
import pick_new_movie_of_day from './jobs/pick_new_movie_of_day.js';
import add_posters_to_movies from './jobs/add_posters_to_movies.js';
import schedule_popular_movie_scrapes from './jobs/schedule_popular_movie_scrapes.js'; 

import { check_if_movie } from '../check_if_movie.js'; 


const jobsToScheduleOnStartup = [
  // add_popular_movies_to_db, 
  add_reviews_for_movies,
  add_posters_to_movies,
  pick_new_movie_of_day,
  schedule_popular_movie_scrapes 
];

(async () => {
  try {
    await check_if_movie(); 

    console.log('🚀 Initializing scheduled jobs...');

    for (const jobDefinition of jobsToScheduleOnStartup) {
      if (!jobDefinition || !jobDefinition.name || !jobDefinition.options) {
        console.warn('⚠️ Found an invalid job definition:', jobDefinition);
        continue;
      }

      const jobData = {};

      await jobQueue.add(jobDefinition.name, jobData, jobDefinition.options);

      if (jobDefinition.options.repeat) {
        console.log(`🔄 Scheduled repeatable job: ${jobDefinition.name} with cron: ${JSON.stringify(jobDefinition.options.repeat)} (Job ID: ${jobDefinition.options.jobId || 'N/A - generated'})`);
      } else {
        console.log(`➕ Added one-time job on startup: ${jobDefinition.name} (Job ID: ${jobDefinition.options.jobId || 'N/A - generated'})`);
      }
    }

    console.log('✅ Job scheduling complete.');

  } catch (error) {
    console.error('❌ Fatal error during scheduler service initialization:', error);
    process.exit(1); 
  }
})();