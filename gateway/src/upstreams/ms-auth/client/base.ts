import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import JwtAbilityMiddleware from '@/middlewares/JwtAbility.Middleware';
import { applyMiddleware } from '@/utils/middleware';
import JwtAdminAbilityMiddleware from '@/middlewares/jwtAdminAbility.Milldleware';

const MsAppUpstream: string = config.get('upstream.ms-auth');

export const MsAuthClientRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create new Client',
    rules: 'POST-->JwtMiddleware',
    prefix: 'clients',
    command: 'CREATE_CLIENT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAdminAbilityMiddleware, []]
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create new External Client',
    rules: 'POST-->JwtMiddleware',
    prefix: 'clients/external',
    command: 'CREATE_EXTERNAL_CLIENT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAdminAbilityMiddleware, []]
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'update Client and user',
    rules: 'POST-->JwtMiddleware',
    prefix: 'clients/update',
    command: 'UPDATE_CLIENT_AND_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['update', 'client']]
      )
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get client by id',
    rules: 'GET-->JwtMiddleware',
    prefix: 'clients/:clientId',
    command: 'GET_CLIENT_BY_ID',
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get client by id',
    rules: 'GET-->JwtMiddleware',
    prefix: 'clients/reduce/:clientId',
    command: 'GET_CLIENT_BY_ID_REDUCE',
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: "get all app's clients",
    rules: 'GET-->JwtMiddleware',
    prefix: 'clients',
    command: 'GET_APP_CLIENTS',
    //TODO declarer cache
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: "get all app's clients",
    rules: 'GET-->JwtMiddleware',
    prefix: 'clients/reduce',
    command: 'GET_APP_CLIENTS_REDUCE',
    preHandler: []
  },
]
