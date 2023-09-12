import { getEnv } from '@/utils/validateEnv';
import { FastifyInstance } from 'fastify';
import { readFileSync } from 'fs';
import { Server, IncomingMessage, ServerResponse } from 'http';
import path from 'path';

/**
 * DOCS : https://github.com/fastify/fastify-jwt
 */
const jwtRegistry = (server: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
  server.register(require('@fastify/jwt'), {
    secret: {
      private: {
        key: readFileSync(`${path.join(__dirname, '..', 'certs')}/private.pem`, 'utf8'),
        passphrase: getEnv<string>('JWT_PASSPHRASE', 'azerty'),
      },
      public: readFileSync(`${path.join(__dirname, '..', 'certs')}/public.pem`, 'utf8'),
    },
    decode: { complete: false },
    sign: {
      algorithm: getEnv<string>('JWT_ALGORITHM', 'RS256'),
      iss: getEnv<string>('JWT_ISS', 'api.alt.bzh'),
    },
    verify: { allowedIss: getEnv<string>('JWT_ISS', 'api.alt.bzh') },
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  server.register(require('@fastify/cookie'));
};

export default jwtRegistry;
