import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthAdminStatusRoutes } from "./base";

const AdminStatusRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthAdminStatusRoutes];

export default AdminStatusRoutes;
