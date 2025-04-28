import { Queue } from 'bullmq';
import job_queue from '../db/job_queue.js';

const jobQueue = new Queue('job-queue', { 
    connection:job_queue,
    defaultJobOptions: {
        removeOnComplete: 500,
        removeOnFail: 100
    }
});

export default jobQueue;