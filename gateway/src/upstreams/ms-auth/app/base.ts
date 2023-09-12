import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import { applyMiddleware } from '@/utils/middleware';
import DevToolsMiddleware from '@/middlewares/devTools.middleware';

const MsAppUpstream: string = config.get('upstream.ms-auth');

export const MsAuthAppRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create new App',
    rules: 'POST-->JwtMiddleware',
    prefix: 'app',
    command: 'CREATE_APP',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, done) {
      await applyMiddleware(
        request, reply,
        [DevToolsMiddleware]
      ) 
    },
  },
]
