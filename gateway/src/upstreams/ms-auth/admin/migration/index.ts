import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthAdminMigrationRoutes } from "./base";

const AdminMigrationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthAdminMigrationRoutes,];

export default AdminMigrationRoutes;
