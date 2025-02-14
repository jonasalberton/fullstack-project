import { FastifyReply } from "fastify";

export const created = <T>(reply: FastifyReply, body: T): void => {
  reply.code(201).send(body);
};

export const internalServerError = <T>(reply: FastifyReply, body: T): void => {
  reply.code(500).send(body);
};

export const notFound = <T>(reply: FastifyReply, body: T): void => {
  reply.code(404).send(body);
};
