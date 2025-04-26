import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import { movieRoute } from './routes/movieRoute';

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(movieRoute, { prefix: '/api' });

const start = async (): Promise<void> => {
    try {
        await fastify.register(cors, {
            origin: '*',
            credentials: true
        });
        await fastify.listen({ port: 3000 });
    }
    catch (e) {
        fastify.log.error(e);
        process.exit(1);
    }
}

start();