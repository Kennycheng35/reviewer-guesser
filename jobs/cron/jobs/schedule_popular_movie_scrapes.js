// This job would be run once to set up the hourly tasks for the next 10 hours
// Or run it daily if you want this cycle to repeat every 10 hours of a day.
// import { movieScrapingQueue } from './your-queue-setup'; // EXAMPLE: how you get your queue
import jobQueue  from '../queue.js';
const MAX_PAGES_TO_SCHEDULE = 10;

export default {
    name: 'schedule_hourly_popular_movie_scrapes',
    options: {
        // Run once a day at midnight to schedule for the next 10 hours
        // Or adjust to run more/less frequently, or trigger manually
        repeat: { cron: '0 1 * * *' },
        jobId: 'scheduler-for-popular-movies'
    },
    handler: async (job) => { // Assuming queue instance is passed or available
        try {
            const baseUrl = process.env.URL;
            if (!baseUrl) {
                console.error(`${job.name} failed: URL environment variable is not set.`);
                return;
            }
            console.log(`${job.name} starting: Scheduling ${MAX_PAGES_TO_SCHEDULE} pages.`);

            for (let i = 0; i < MAX_PAGES_TO_SCHEDULE; i++) {
                const pageNumber = i + 1;
                const pageUrl = (pageNumber === 1) ? baseUrl : `${baseUrl}/page/${pageNumber}`;
                const delay = i * 60 * 60 * 1000; // i hours in milliseconds

                // Add to the queue that 'scrape_single_letterboxd_page' worker processes
                await jobQueue.add('scrape_single_letterboxd_page',
                    { pageUrl, pageNumber },
                    {
                        delay: delay,
                        jobId: `scrape-popular-page-${pageNumber}-${Date.now()}` // Unique job ID
                    }
                );
                console.log(`Scheduled job for ${pageUrl} with a delay of ${i} hour(s).`);
            }
            console.log(`${job.name} finished scheduling.`);
        } catch (e) {
            console.error(`${job.name} failed:`, e);
        }
    }
};