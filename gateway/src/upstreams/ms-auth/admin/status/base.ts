import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import JwtAbilityMiddleware from "@/middlewares/JwtAbility.Middleware";
import { applyMiddleware } from "@/utils/middleware";
import { FastifyReply } from "fastify";

export const MsAuthAdminStatusRoutes : Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'activate or desactivate an admin',
    rules: 'POST-->JwtMiddleware',
    prefix: 'usersAd/status/:id',
    command: 'ACTIVATE_ADMIN',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        //[JwtAbilityMiddleware, ['update', 'adminStatus']],
      )
    },
  },
]
