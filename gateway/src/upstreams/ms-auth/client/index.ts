import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';

import { MsAuthClientRoutes } from "./base";

const ClientsRoutes: Array<FastifyHttpProxyAlt| NatsProxyAlt> = [
  ...MsAuthClientRoutes
];

export default ClientsRoutes;
