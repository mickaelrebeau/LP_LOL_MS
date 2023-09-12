import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';

import JwApplyPostHandlerUser from '@/postHandlers/applyJWT.postHandler.user';

const MsAuthUpstream: string = config.get('upstream.ms-auth');

export const MsAuthBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'dedicated endpoint for users signup',
    rules: 'POST-->open',
    prefix: 'auth/signup',
    command: 'SIGNUP',
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      return await JwApplyPostHandlerUser(request, reply)
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'forgot password',
    rules: 'POST-->open',
    prefix: 'auth/forgot-password',
    command: 'FORGOT_PASSWORD',
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply) {}

  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'verify token',
    rules: 'GET-->open',
    prefix: 'auth/verify-token/:token',
    command: 'VERIFY_TOKEN',
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply) {}
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'forgot password',
    rules: 'POST-->open',
    prefix: 'auth/new-password/:token',
    command: 'NEW_PASSWORD',
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'dedicated endpoint for users signin',
    rules: 'POST-->open',
    prefix: 'auth/signin',
    command: 'AUTH_USER',
    preHandler: [],
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      return await JwApplyPostHandlerUser(request, reply)
    }
  },
  /* {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'Facebook auth',
    rules: 'GET-->open',
    prefix: 'auth/signin/facebook',
    command: 'FACEBOOK_AUTH_USER',
    preHandler: [],
  }, */
  {
    type: ProxyType.HTTP,
    upstream: MsAuthUpstream,
    httpMethods: ['GET'],
    comment: 'Facebook auth',
    rules: 'GET-->open',
    prefix: 'auth/signin/facebook',
    rewritePrefix: 'auth/signin/facebook',
  },
  {
    type: ProxyType.HTTP,
    upstream: MsAuthUpstream,
    httpMethods: ['GET'],
    comment: 'Google auth',
    rules: 'GET-->open',
    prefix: 'auth/signin/google',
    rewritePrefix: 'auth/signin/google',
  },
  {
    type: ProxyType.HTTP,
    upstream: MsAuthUpstream,
    httpMethods: ['GET'],
    comment: 'LinkedIn auth',
    rules: 'GET-->open',
    prefix: 'auth/signin/linkedin',
    rewritePrefix: 'auth/signin/linkedin',
  },
  {
    type: ProxyType.HTTP,
    upstream: MsAuthUpstream,
    httpMethods: ['GET'],
    comment: 'Instagram auth',
    rules: 'GET-->open',
    prefix: 'auth/signin/instagram',
    rewritePrefix: 'auth/signin/instagram',
  },
  {
    type: ProxyType.HTTP,
    upstream: MsAuthUpstream,
    httpMethods: ['GET'],
    comment: 'Twitter auth',
    rules: 'GET-->open',
    prefix: 'auth/signin/twitter',
    rewritePrefix: 'auth/signin/twitter',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'Facebook auth redirect',
    rules: 'GET-->open',
    prefix: 'auth/signin/facebook/redirect',
    command: "REDIRECT",
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'Google auth redirect',
    rules: 'GET-->open',
    prefix: 'auth/signin/google/redirect',
    command: "REDIRECT_GOOGLE",
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'Twitter auth redirect',
    rules: 'GET-->open',
    prefix: 'auth/signin/twitter/redirect',
    command: "REDIRECT_TWITTER",
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'Instagram auth redirect',
    rules: 'GET-->open',
    prefix: 'auth/signin/instagram/redirect',
    command: "REDIRECT_INSTAGRAM",
    preHandler: []
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'Linkedin auth redirect',
    rules: 'GET-->open',
    prefix: 'auth/signin/linkedin/redirect',
    command: "REDIRECT_LINKEDIN",
    preHandler: []
  },
];
