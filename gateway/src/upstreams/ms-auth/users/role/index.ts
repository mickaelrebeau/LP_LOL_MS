import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthUsersRoleRoutes } from "./base";

const UserRoleRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthUsersRoleRoutes];

export default UserRoleRoutes;
