/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import { JwApplyPostHandlerUser } from '@/postHandlers/applyJWT.postHandler.user';
import refreshTokenHandler from '@/postHandlers/applyJWT.refreshTokenHandler';


export const MsAuthBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'user sign up',
    rules: 'POST-->open',
    prefix: 'auth/signup',
    command: 'SIGNUP'
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'user login',
    rules: 'POST-->open',
    prefix: 'auth/login',
    command: 'LOGIN',
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      return await JwApplyPostHandlerUser(request, reply)
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'reset password',
    rules: 'POST-->open',
    prefix: 'auth/reset-password',
    command: 'RESET_PASSWORD',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'refresh token',
    rules: 'POST-->open',
    prefix: 'auth/refresh-token',
    command: 'REFRESH_TOKEN',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      return await refreshTokenHandler(request, reply); 
    }
  }
];
