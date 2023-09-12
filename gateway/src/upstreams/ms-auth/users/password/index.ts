import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthUsersPasswordRoutes } from "./base";

const UserPasswordRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthUsersPasswordRoutes];

export default UserPasswordRoutes;
