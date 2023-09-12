import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from "@/definitions";
import JwtAbilityMiddleware from "@/middlewares/JwtAbility.Middleware";
import { applyMiddleware } from "@/utils/middleware";
import { FastifyReply } from "fastify";

export const MsAuthUsersStatusRoutes : Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'activate or desactivate a user',
    rules: 'POST-->JwtMiddleware',
    prefix: 'users/status/:id',
    command: 'ACTIVATE_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await applyMiddleware(
        request, reply,
        [JwtAbilityMiddleware, ['update', 'userStatus']]
      )
    },
  },
]
