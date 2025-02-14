import fastify from "fastify";

const logger = fastify({ logger: true }).log;

export default logger;
