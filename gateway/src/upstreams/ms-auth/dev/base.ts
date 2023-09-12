import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';

const MsAuthUpstream: string = config.get('upstream.ms-auth');

export const MsAuthBaseRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'for dev to create Role',
    rules: 'POST-->open',
    prefix: 'internal/abilities/role',
    command: 'CREATE_ROLE',
    preHandler: [],
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'for dev to create abilities (permissions and subjects)',
    rules: 'POST-->open',
    prefix: 'internal/abilities/permission',
    command: 'CREATE_ABILITIES',
    preHandler: [],
  }
]
