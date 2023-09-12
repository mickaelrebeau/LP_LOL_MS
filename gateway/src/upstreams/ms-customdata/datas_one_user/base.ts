import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import config from 'config';


export const MsCustomdataDatasOneUserBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'juste un commentaire',
        rules: 'POST-->open',
        prefix: 'one',  // ne pas mettre de / devant le prefix
        command: 'CREATE_DATAS_ONE_USER',
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
        prefix: 'one/:id',  // ne pas mettre de / devant le prefix
        command: 'DATAS_ONE_USER_BY_ID',
        async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
          console.log('request;body', request.body)
          //établir les regles pour accéder à la suite
        },
      },
      {
        type: ProxyType.NATS,
        httpMethods: ['PUT'],
        comment: 'juste un commentaire',
        rules: 'PUT-->open',
        prefix: 'one/update/:id',  // ne pas mettre de / devant le prefix
        command: 'UPDATE_DATAS_ONE_USER',
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
        prefix: 'one/contact/:user_id/:contact_id',  // ne pas mettre de / devant le prefix
        command: 'DATAS_ONE_USER_BY_CONTACT_ID',
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
        prefix: 'one/all/:user_id',  // ne pas mettre de / devant le prefix
        command: 'DATAS_ONE_USER_BY_USER_ID',
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
        prefix: 'one/delete/:id',  // ne pas mettre de / devant le prefix
        command: 'DELETE_DATAS_ONE_USER',
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
        prefix: 'one/all',  // ne pas mettre de / devant le prefix
        command: 'ALL_DATAS_ONE_USER',
        async preHandler(request :  FastifyRequestWithContext, reply: FastifyReply){  // méthode qui s'applique avant d'ateindre le micro service
          console.log('request;body', request.body)
          //établir les regles pour accéder à la suite
        },
      },

];