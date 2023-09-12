
import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import { MsAuthBaseRoutes } from './base';

const DevRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthBaseRoutes];

export default DevRoutes;
