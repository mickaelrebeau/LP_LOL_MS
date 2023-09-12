import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthUsersStatusRoutes } from "./base";

const UserStatusRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthUsersStatusRoutes];

export default UserStatusRoutes;
