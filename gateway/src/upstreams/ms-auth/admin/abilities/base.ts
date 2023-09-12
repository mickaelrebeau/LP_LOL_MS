import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import cacheRedisMiddleware from "@/middlewares/cacheRedis.middleware";
import JwtAbilityMiddleware from "@/middlewares/JwtAbility.Middleware";
import { applyMiddleware } from "@/utils/middleware";
import { FastifyReply } from "fastify";

export const MsAuthAdminAbilitiesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show one admin by id with abilities',
    rules: 'GET-->JwtMiddleware',
    prefix: 'usersAd/abilities/:id/',
    command: 'GET_ADMIN_ABILITIES',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'adminAbilities']],
        [cacheRedisMiddleware],
      )
    },
  },
  
]
