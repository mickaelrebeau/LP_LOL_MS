import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import cacheRedisMiddleware from "@/middlewares/cacheRedis.middleware";
import JwtAbilityMiddleware from "@/middlewares/JwtAbility.Middleware";
import { applyMiddleware } from "@/utils/middleware";
import { FastifyReply } from "fastify";

export const MsAuthUsersPasswordRoutes : Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'update password',
    rules: 'POST-->JwtMiddleware',
    prefix: 'users/password/:id',
    command: 'CHANGE_PASSWORD',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['update', 'user']]
      )
    },
  },
]
