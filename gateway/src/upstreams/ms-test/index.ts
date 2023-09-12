import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import { MsAuthUserBasesRoutes } from './user/base';
import { MsAuthBasesRoutes } from './auth/base';

export const MsAuthRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsAuthBasesRoutes,
    ...MsAuthUserBasesRoutes
];
