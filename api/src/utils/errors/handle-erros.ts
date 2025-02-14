import { FastifyReply } from "fastify";
import { NotFoundError } from "./not-found";
import { internalServerError, notFound } from "../http";

export function handleError(reply: FastifyReply, error: unknown) {
  reply.log.error(error);

  if (error instanceof NotFoundError) {
    return notFound(reply, { message: error.message });
  }

  internalServerError(reply, error);
}
