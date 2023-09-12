import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';

import { MsAuthAppRoutes } from "./base";

const AppRoutes: Array<FastifyHttpProxyAlt| NatsProxyAlt> = [
  ...MsAuthAppRoutes
];

export default AppRoutes;
