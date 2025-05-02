import Redis from 'ioredis';

import dotenv from 'dotenv';

dotenv.config();

const job_queue = new Redis({
    port: 6380,
    host: 'redis-bullmq',
    password: process.env.REDIS_BULLMQ_PASSWORD,
    maxRetriesPerRequest: null, 
});

job_queue.on('connect', () => console.log('Job Queue connected'));
job_queue.on('error', err => console.error('Job Queue error', err));

export default job_queue;