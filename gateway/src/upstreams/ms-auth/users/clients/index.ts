import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthUsersClientRoutes } from "./base";

const UserClientRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthUsersClientRoutes,];

export default UserClientRoutes;
