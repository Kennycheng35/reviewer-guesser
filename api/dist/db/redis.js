"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = new ioredis_1.default({
    port: 6379,
    host: '127.0.0.1',
    password: process.env.REDIS_MOVIE_PASSWORD
});
redis.on('connect', () => console.log('Redis Connection successful'));
redis.on('error', err => console.error('Redis unable to connect to the database:', err));
exports.default = redis;
