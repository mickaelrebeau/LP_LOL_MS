import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import cacheRedisMiddleware from "@/middlewares/cacheRedis.middleware";
import JwtAbilityMiddleware from "@/middlewares/JwtAbility.Middleware";
import { applyMiddleware } from "@/utils/middleware";
import { FastifyReply } from "fastify";

export const MsAuthAdminRoleRoutes : Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: "update one admin's role",
    rules: 'POST-->JwtMiddleware',
    prefix: 'usersAd/role/:id',
    command: 'UPDATE_ROLE_ADMIN',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        //[JwtAbilityMiddleware, ['update', 'adminRole']]
      )
    },
  },
]
