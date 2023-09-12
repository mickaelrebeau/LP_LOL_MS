import { MsAuthBasesRoutes } from './base';
import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';

const AuthRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [ ...MsAuthBasesRoutes];

export default AuthRoutes;
