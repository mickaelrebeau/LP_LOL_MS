import { FastifyHttpProxyAlt, NatsProxyAlt } from "@/definitions";
import { MsTokenBasesRoutes } from "./token/base";

export const MsTokenRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsTokenBasesRoutes
]