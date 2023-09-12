import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthUsersMigrationRoutes } from "./base";

const UserMigrationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthUsersMigrationRoutes,];

export default UserMigrationRoutes;
