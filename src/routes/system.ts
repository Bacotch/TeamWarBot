import { FastifyInstance } from 'fastify'

export default async function systemRoutes(fastify: FastifyInstance) {
  fastify.get(`/status`, async (request, reply) => {
    reply.status(200).header('content-type', 'text/plain').send('Server is running.')
  })
}
