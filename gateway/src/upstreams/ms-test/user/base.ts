/* eslint-disable prettier/prettier */
import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import { applyMiddleware } from '@/utils/middleware';
import JwtMiddleware from '@/middlewares/Jwt.Middleware';


export const MsAuthUserBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'check user password',
    rules: 'POST-->open',
    prefix: 'profil/check-password',
    command: 'CHECK_PASSWORD',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      await applyMiddleware(
        request, reply,
        [JwtMiddleware]
      )
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get user by id',
    rules: 'GET-->open',
    prefix: 'profil',
    command: 'USER_ID',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      await applyMiddleware(
        request, reply,
        [JwtMiddleware]
      )
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'update an user',
    rules: 'POST-->open',
    prefix: 'profil',
    command: 'UPDATE_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      await applyMiddleware(
        request, reply,
        [JwtMiddleware]
      )
    }
  }
];

