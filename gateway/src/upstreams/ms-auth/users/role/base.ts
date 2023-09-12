import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import cacheRedisMiddleware from "@/middlewares/cacheRedis.middleware";
import JwtAbilityMiddleware from "@/middlewares/JwtAbility.Middleware";
import { applyMiddleware } from "@/utils/middleware";
import { FastifyReply } from "fastify";

export const MsAuthUsersRoleRoutes : Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  
]
