import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsAuthAdminAbilitiesRoutes } from "./base";

const AdminAbilitiesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsAuthAdminAbilitiesRoutes,];

export default AdminAbilitiesRoutes;
