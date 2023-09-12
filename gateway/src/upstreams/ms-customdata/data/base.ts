import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import { applyMiddleware } from '@/utils/middleware';
import JwtMiddleware from '@/middlewares/Jwt.Middleware';


export const MsCustomdataBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'juste un commentaire',
    rules: 'POST-->open',
    prefix: 'data',
    command: 'CREATE_DATA',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      await applyMiddleware(
        request, reply,
        [JwtMiddleware]
      )
    }
    
  },

  {
    type: ProxyType.NATS,
    httpMethods: ['PUT'],
    comment: 'juste un commentaire',
    rules: 'PUT-->open',
    prefix: 'data/update/:id',
    command: 'UPDATE_DATA',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){
      console.log('request;body', request.body)
    },
    async postHandler(request: FastifyRequestWithContext, reply: FastifyReply ){
      console.log("coucou", request)
    }
    
  },

  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'juste un commentaire',
    rules: 'GET-->open',
    prefix: 'data/all/:id',
    command: 'DATA_BY_USER_ID',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply) {
      await applyMiddleware(
        request, reply,
        [JwtMiddleware]
      )
    }

  },

  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'juste un commentaire',
    rules: 'GET-->open',
    prefix: 'data/:id',
    command: 'DATA_BY_ID',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){
      console.log('request;body', request.body)
    },
    
  },

  {
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'juste un commentaire',
    rules: 'DELETE-->open',
    prefix: 'data/delete/:id',
    command: 'DELETE_DATA',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){
      console.log('request;body', request.body)
    },
    
  },



];
