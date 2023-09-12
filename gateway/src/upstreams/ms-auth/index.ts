import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import UserRoutes from './users';
import AuthRoutes from './auth';
import DevRoutes from './dev';
import AbilitiesRoutes from './abilities';
import ClientsRoutes from './client';
import AppRoutes from './app';

export const MsAuthTestRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  ...UserRoutes,
  ...AuthRoutes,
  ...DevRoutes,
  ...AbilitiesRoutes,
  ...ClientsRoutes,
  ...AppRoutes
];
