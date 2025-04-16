import { FastifyInstance } from "fastify";
import { Bot } from "../Bot.ts";

export default async function userRoutes(fastify: FastifyInstance) {

  fastify.get(`/users`, async (request, reply) => {
    return { users: [] };
  });

}