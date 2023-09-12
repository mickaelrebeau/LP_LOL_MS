import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthUsersAbilitiesRoutes } from "./base";

const UserAbilitiesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthUsersAbilitiesRoutes,];

export default UserAbilitiesRoutes;
