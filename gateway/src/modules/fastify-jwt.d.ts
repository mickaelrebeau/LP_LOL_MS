import { orderClientInterface } from '@/definitions';
import '@fastify/jwt';
import Redis from 'ioredis';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      appId?: string;
      role?: string;
      internalId?: string;
      userId: string;
      user?: {
        id: string;
        source: 'user' | 'admin',
        email: string;
        status: string;
      }
      //clients?: Array<orderClientInterface>;
    }; // payload type is used for signing and verifying
    user: {
      tokenId: string;
      id: string;
      firstname?: string;
      lastname?: string;
    }; // user type is return type of `request.user` object
  }


}

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
  interface FastifyReply {
    setCookie: any;
  }
}
