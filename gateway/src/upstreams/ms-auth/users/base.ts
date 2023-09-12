import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import {applyMiddleware} from '@/utils/middleware'
import JwtAbilityMiddleware from '@/middlewares/JwtAbility.Middleware';
import cacheRedisMiddleware from '@/middlewares/cacheRedis.middleware';
import JwtMiddleware from '@/middlewares/Jwt.Middleware';


export const MsAuthUsersRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: "show user's data connected",
    rules: 'GET-->JwtMiddleware',
    prefix: 'users/me',
    command: 'SHOW_ME',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['read', 'user']],
        //[cacheRedisMiddleware],
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get one user by id',
    rules: 'GET-->JwtMiddleware',
    prefix: 'users/:id',
    command: 'GET_USER_BY_ID',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      /* await applyMiddleware(
        request, reply,
        [JwtMiddleware, ['read', 'user']],
        [cacheRedisMiddleware],
      ) */
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get one user by email',
    rules: 'GET-->JwtMiddleware',
    prefix: 'users/byEmail/:email',
    command: 'GET_USER_BY_EMAIL',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      /* await applyMiddleware(
        request, reply,
        [JwtMiddleware, ['read', 'user']],
        [cacheRedisMiddleware],
      ) */
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show all users',
    rules: 'GET-->JwtMiddleware',
    prefix: 'users',
    command: 'INDEX_USERS',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      /* await applyMiddleware(
        request, reply,
        [JwtMiddleware, ['read', 'user']],
        [cacheRedisMiddleware],
      ) */
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create user',
    rules: 'POST-->JwtMiddleware',
    prefix: 'users',
    command: 'CREATE_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      /* await applyMiddleware(
        request, reply,
        [JwtMiddleware, ['create', 'user']]
      ) */
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'update the user connected',
    rules: 'POST-->JwtMiddleware',
    prefix: 'users/me',
    command: 'UPDATE_ME',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      /* await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['update', 'user']]
      ) */
    },
  },

  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'update a user by id',
    rules: 'POST-->JwtMiddleware',
    prefix: 'users/:id',
    command: 'UPDATE_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      /* await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['update', 'user']]
      ) */
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'delete a user',
    rules: 'DELETE-->JwtMiddleware',
    prefix: 'users/:id',
    command: 'DELETE_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
     /*  await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['delete', 'user']]
      ) */
    },
  },
]
