import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import { applyMiddleware } from '@/utils/middleware';
import cacheRedisMiddleware from '@/middlewares/cacheRedis.middleware';
import JwtAbilityMiddleware from '@/middlewares/JwtAbility.Middleware';

const MsAuthUpstream: string = config.get('upstream.ms-auth');

export const MsAuthSubjectRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get all existing subjects and permissions attached',
    rules: 'GET-->JwtMiddleware',
    prefix: 'abilities/subjects',
    command: 'GET_ALL_SUBJECTS',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        //[JwtAbilityWithConditionsMiddleware, ['read', 'abilities']],
        //[cacheRedisMiddleware],
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get all existing subjects and permissions attached',
    rules: 'GET-->JwtMiddleware',
    prefix: 'abilities/subjects/:id',
    command: 'GET_ONE_SUBJECT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'abilities']],
        [cacheRedisMiddleware],
      )
    },
  },
]
