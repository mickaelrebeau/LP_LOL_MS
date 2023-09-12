import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthAdminPasswordRoutes } from "./base";

const AdminPasswordRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthAdminPasswordRoutes];

export default AdminPasswordRoutes;
