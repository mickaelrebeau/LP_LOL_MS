import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';


export const MsExchangeBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  // {
  //   type: ProxyType.NATS,
  //   httpMethods: ['GET'],
  //   comment: 'juste un commentaire',
  //   rules: 'GET-->open',
  //   prefix: 'request',
  //   command: 'ALL_REQUESTS',
  //   // async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){
  //   //   console.log('request.body', request.body)
  //   // },
  //   // async postHandler(request: FastifyRequestWithContext, reply: FastifyReply ){
  //   //   console.log("coucou", request)
  //   // }
  // },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create exchange',
    rules: "POST-->open",
    prefix: 'exchange',
    command: 'CREATE_EXCHANGE'
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['PUT'],
    comment: 'update a exchange',
    rules: "PUT-->open",
    prefix: 'exchange/:id',
    command: 'UPDATE_EXCHANGE'
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get exchange by user_target_id',
    rules: "GET-->open",
    prefix: 'exchange/target/:id',
    command: 'GET_EXCHANGE_BY_TARGET_ID'
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get exchange by user_requester_id',
    rules: "GET-->open",
    prefix: 'exchange/requester/:id',
    command: 'GET_EXCHANGE_BY_REQUESTER_ID'
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get exchange by user_target_id and type',
    rules: "GET-->open",
    prefix: 'exchange/target/:id/:type',
    command: 'GET_EXCHANGE_BY_TARGET_ID_AND_TYPE'
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get exchange by user_requester_id and type',
    rules: "GET-->open",
    prefix: 'exchange/requester/:id/:type',
    command: 'GET_EXCHANGE_BY_REQUESTER_ID_AND_TYPE'
  }
];