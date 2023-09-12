import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import {applyMiddleware} from '@/utils/middleware'
import JwtAbilityMiddleware from '@/middlewares/JwtAbility.Middleware';
import cacheRedisMiddleware from '@/middlewares/cacheRedis.middleware';


export const MsAuthUsersClientRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: "show all client's users",
    rules: 'GET-->JwtMiddleware',
    prefix: 'users/client/:clientId',
    command: 'INDEX_USERS_BY_CLIENT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
/*       await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'user']], //admin ou organisateur du client
        [cacheRedisMiddleware],
      ) */
    },
  },
]
