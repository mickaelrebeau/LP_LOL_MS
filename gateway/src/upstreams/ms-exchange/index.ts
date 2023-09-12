import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import { MsExchangeBasesRoutes } from '../ms-exchange/base';

export const MsExchangesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsExchangeBasesRoutes
];
