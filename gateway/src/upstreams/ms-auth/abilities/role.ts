import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import JwtAbilityMiddleware from '@/middlewares/JwtAbility.Middleware';
import { applyMiddleware } from '@/utils/middleware';


export const MsAuthRoleRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get all existing roles and permissions attached',
    rules: 'GET-->JwtMiddleware',
    prefix: 'abilities/role',
    command: 'GET_ALL_ROLES',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'abilities']],
        //[cacheRedisMiddleware],
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get one roles and permissions attached',
    rules: 'GET-->JwtMiddleware',
    prefix: 'abilities/role/:roleId',
    command: 'GET_ONE_ROLE',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'abilities']],
        //[cacheRedisMiddleware],
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show all users by role',
    rules: 'GET-->JwtMiddleware',
    prefix: 'abilities/role/:roleId/users',
    command: 'INDEX_USERS_BY_ROLE',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'userRole']],
        //[cacheRedisMiddleware],
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create new role',
    rules: 'POST-->JwtMiddleware',
    prefix: 'abilities/role',
    command: 'CREATE_ROLE',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['create', 'abilities']]
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'update name role',
    rules: 'POST-->JwtMiddleware',
    prefix: 'abilities/role/:roleId',
    command: 'UPDATE_ROLE',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['update', 'abilities']]
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'delete role',
    rules: 'DELETE-->JwtMiddleware',
    prefix: 'abilities/role/:roleId',
    command: 'DELETE_ROLE',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['delete', 'abilities']]
      )
    },
  },
]
