"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const movieRoute_1 = require("./routes/movieRoute");
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(movieRoute_1.movieRoute, { prefix: '/api' });
const start = async () => {
    try {
        await fastify.register(cors_1.default, {
            origin: '*',
            credentials: true
        });
        await fastify.listen({ port: 3000 });
    }
    catch (e) {
        fastify.log.error(e);
        process.exit(1);
    }
};
start();
