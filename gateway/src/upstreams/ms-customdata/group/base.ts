import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';
import { applyMiddleware } from '@/utils/middleware';
import JwtMiddleware from '@/middlewares/Jwt.Middleware';


export const MsCustomdataGroupBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  // { // requete témoin
  //   type: ProxyType.NATS, // quel est le type de la requete apres redirection par le gateway ? 
  //   httpMethods: ['POST'], // quel est la méthode pour atteindre la route sur le gateway ? 
  //   comment: 'juste un commentaire',
  //   rules: 'POST-->open',
  //   prefix: 'group/signup', //quel est l' url pour atteindre la route via le gateway ? 
  //   command: 'SIGNUP', // quel est la commande nats pour atteidnre le ms ?? 
  //   async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
  //     console.log('request;body', request.body)
  //     //établir les regles pour accéder à la suite
  //   },
  //   async postHandler(request: FastifyRequestWithContext, reply: FastifyReply ){ // méthode qui s'applique apres avoir atteint le micro service
  //     //exemple de'action dans posthandler : transformer l'user reçu en token.
  //     //get l'user
  //     //appelle la foncion qui transforme l'user en token 
  //     console.log("coucou", request)
  //   }
  // },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'juste un commentaire',
    rules: 'POST-->open',
    prefix: 'group',  // ne pas mettre de / devant le prefix pas de /group
    command: 'CREATE_GROUP',
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
    prefix: 'group/:id',  // ne pas mettre de / devant le prefix pas de /group
    command: 'GROUP_BY_ID',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
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
    prefix: 'group',  // ne pas mettre de / devant le prefix pas de /group
    command: 'GROUP_BY_USER_ID',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
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
    prefix: 'group/update/:id',  // ne pas mettre de / devant le prefix pas de /group
    command: 'UPDATE_GROUP',
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
    httpMethods: ['DELETE'],
    comment: 'juste un commentaire',
    rules: 'DELETE-->open',
    prefix: 'group/delete/:id',  // ne pas mettre de / devant le prefix pas de /group
    command: 'DELETE_GROUP',
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
    prefix: 'groups',  // ne pas mettre de / devant le prefix pas de /group
    command: 'ALL_GROUP',
    async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
      console.log('request;body', request.body)
      //établir les regles pour accéder à la suite
    },
  },


];
