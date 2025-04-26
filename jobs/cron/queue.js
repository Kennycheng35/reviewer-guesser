import { Queue } from 'bullmq';
import job_queue from '../db/job_queue.js';

const jobQueue = new Queue('job-queue', { connection:job_queue });

export default jobQueue;