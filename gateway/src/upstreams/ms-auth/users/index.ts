
import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import UserAbilitiesRoutes from './abilities';
import { MsAuthUsersRoutes } from './base';
import UserClientRoutes from './clients';
import UserMigrationRoutes from './migration';
import UserPasswordRoutes from './password';
import UserRoleRoutes from './role';
import UserStatusRoutes from './status';

const UsersRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  ...UserAbilitiesRoutes,
  ...UserRoleRoutes,
  ...UserStatusRoutes,
  ...UserPasswordRoutes,
  ...UserMigrationRoutes,
  ...MsAuthUsersRoutes,
  ...UserClientRoutes,
];

export default UsersRoutes;
