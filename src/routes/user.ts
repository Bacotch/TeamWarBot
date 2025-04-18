import { container } from "tsyringe";
import { FastifyInstance } from "fastify";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(`/users`, async (request, reply) => {
    
  });

}