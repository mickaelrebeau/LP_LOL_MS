
import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import AdminAbilitiesRoutes from './abilities';
import { MsAuthAdminRoutes } from './base';
import AdminMigrationRoutes from './migration';
import AdminPasswordRoutes from './password';
import AdminRoleRoutes from './role';
import AdminStatusRoutes from './status';

const AdminRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  ...AdminRoleRoutes,
  ...AdminMigrationRoutes,
  ...AdminPasswordRoutes,
  ...AdminAbilitiesRoutes,
  ...AdminStatusRoutes,
  ...MsAuthAdminRoutes
];

export default AdminRoutes;
