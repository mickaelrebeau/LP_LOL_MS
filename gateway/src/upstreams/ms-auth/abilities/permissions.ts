import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import JwtAbilityMiddleware from '@/middlewares/JwtAbility.Middleware';
import cacheRedisMiddleware from '@/middlewares/cacheRedis.middleware';
import { applyMiddleware } from '@/utils/middleware';

const MsAuthUpstream: string = config.get('upstream.ms-auth');

export const MsAuthPermissionRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get all permissions by subject',
    rules: 'GET-->JwtMiddleware',
    prefix: 'abilities/permission/subject/:id',
    command: 'GET_PERMISSIONS_BY_SUBJECT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        /* [JwtAbilityWithConditionsMiddleware, ['read', 'abilities']],
        [cacheRedisMiddleware], */
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'add role to permissionS',
    rules: 'POST-->JwtMiddleware',
    prefix: 'abilities/permission',
    command: 'UPDATE_ROLE_PERMISSIONS',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        //[JwtAbilityMiddleware, ['update', 'abilities']],
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'delete role in permission',
    rules: 'DELETE-->JwtMiddleware',
    prefix: 'abilities/permission/:permissionId/role',
    command: 'DELETE_ROLE_PERMISSION',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['delete', 'abilities']]
      )
    },
  },
]

