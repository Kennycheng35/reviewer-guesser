import Fastify from 'fastify';
import cors from '@fastify/cors';
import { movieRoute } from './routes/movieRoute.js';
import dotenv from 'dotenv';
dotenv.config();
const fastify = Fastify({ logger: true });
fastify.register(movieRoute, { prefix: '/api' });
const port = parseInt(process.env.BACKEND_PORT || '3000', 10);
const start = async () => {
    try {
        await fastify.register(cors, {
            origin: '*',
            credentials: true
        });
        await fastify.listen({ port, host: '0.0.0.0' });
    }
    catch (e) {
        fastify.log.error(e);
        process.exit(1);
    }
};
start();
