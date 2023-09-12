import { FastifyHttpProxyAlt, ProxyType } from "@/definitions";
import { NatsProxyAlt } from '../../../definitions/index';


export const MsTokenBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    // {
    //     type: ProxyType.NATS,
    //     httpMethods: ["POST"],
    //     comment: 'create a token for verif email',
    //     rules: "POST-->open",
    //     prefix: 'token/verif-email',
    //     command: 'CREATE_TOKEN_VERIF_EMAIL'
    // },
    {
        type: ProxyType.NATS,
        httpMethods: ["POST"],
        comment: 'create a token for reset-password',
        rules: "POST-->open",
        prefix: "token/reset-password",
        command: 'CREATE_TOKEN_RESET_PASSWORD'
    },
    {
        type: ProxyType.NATS,
        httpMethods: ["GET"],
        comment: 'verif email by token id and type is existing on bdd with verif time duration',
        rules: "GET-->open",
        prefix: "token/verif-email/:token/:id/:type",
        command: 'VERIFICATION_EMAIL',
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'verif reset-password url by token id and type is existing on bdd with time duration',
        rules: "GET-->open",
        prefix: "token/reset-password/:token/:id/:type",
        command: 'VERIFICATION_RESET_PASSWORD_URL'
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'matching on existing opt code and otp code give by customers',
        rules: "POST-->open",
        prefix: "token/reset-password/:token/:id/:type",
        command: 'MATCHING_OPT_CODE'
    }
]