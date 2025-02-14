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

export const ok = <T>(reply: FastifyReply, body: T): void => {
  reply.code(200).send(body);
};

export const noContent = (reply: FastifyReply): void => {
  reply.code(204);
};
