import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthAdminRoleRoutes } from "./base";

const AdminRoleRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthAdminRoleRoutes];

export default AdminRoleRoutes;
