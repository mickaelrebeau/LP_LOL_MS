import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import { FastifyReply } from "fastify";
import { applyMiddleware } from "@/utils/middleware";
import JwtMiddleware from "@/middlewares/Jwt.Middleware";


export const MsPresetDataBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
        type: ProxyType.NATS,
        httpMethods: ["GET"],
        comment: 'get all',
        rules: "GET-->open",
        prefix: 'preset-data',
        command: 'GET_ALL',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
            await applyMiddleware(
              request, reply,
              [JwtMiddleware]
            )
          }
    }
]