import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import { MsAuthPermissionRoutes } from './permissions';
import { MsAuthRoleRoutes } from './role';
import { MsAuthSubjectRoutes } from './subjects';

const AbilitiesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthRoleRoutes, ...MsAuthPermissionRoutes, ...MsAuthSubjectRoutes];

export default AbilitiesRoutes;
