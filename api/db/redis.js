import Redis from 'ioredis';

import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    port: 6379,
    host: 'redis-movie',
    password: process.env.REDIS_MOVIE_PASSWORD
});

redis.on('connect', () => console.log('Redis Connection successful'));
redis.on('error', err => console.error('Redis unable to connect to the database:', err));

export default redis;