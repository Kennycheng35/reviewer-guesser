import Redis from 'ioredis';

import dotenv from 'dotenv';

dotenv.config();

const job_queue = new Redis({
    port: 6380,
    host: '127.0.0.1',
    maxRetriesPerRequest: null, // 🔥 required for BullMQ
});

job_queue.on('connect', () => console.log('Job Queue connected'));
job_queue.on('error', err => console.error('Job Queue error', err));

export default job_queue;