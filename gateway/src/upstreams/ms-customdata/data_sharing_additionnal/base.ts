import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';


export const MsCustomdataDataSharingAdditionnalBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
 
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'juste un commentaire',
    rules: 'POST-->open',
    prefix: 'data-add',  // ne pas mettre de / devant le prefix
    command: 'CREATE_DATA_SHARING_ADDITIONNAL',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
      console.log('request;body', request.body)
      //établir les regles pour accéder à la suite
    },
    async postHandler(request :  FastifyRequestWithContext, reply: FastifyReply){
      console.log("request")
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['PUT'],
    comment: 'juste un commentaire',
    rules: 'PUT-->open',
    prefix: 'data-add/update/:id',  // ne pas mettre de / devant le prefix
    command: 'UPDATE_DATA_SHARING_ADDITIONNAL',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
      console.log('request;body', request.body)
      //établir les regles pour accéder à la suite
    },
    async postHandler(request :  FastifyRequestWithContext, reply: FastifyReply){
      console.log("request")
    }
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'juste un commentaire',
    rules: 'GET-->open',
    prefix: 'data-add/:id',  // ne pas mettre de / devant le prefix pas de /group
    command: 'DATA_SHARING_ADDITIONNAL_BY_ID',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
      console.log('request;body', request.body)
      //établir les regles pour accéder à la suite
    },
  },


  {
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'juste un commentaire',
    rules: 'DELETE-->open',
    prefix: 'data-add/delete/:id',  // ne pas mettre de / devant le prefix pas de /group
    command: 'DELETE_DATA_SHARING_ADDITIONNAL',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
      console.log('request;body', request.body)
      //établir les regles pour accéder à la suite
    },
  },

  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'juste un commentaire',
    rules: 'GET-->open',
    prefix: 'data-add/all',  // ne pas mettre de / devant le prefix pas de /group
    command: 'ALL_DATA_SHARING_ADDITIONNALS',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
      console.log('request;body', request.body)
      //établir les regles pour accéder à la suite
    },
  },

 
];
