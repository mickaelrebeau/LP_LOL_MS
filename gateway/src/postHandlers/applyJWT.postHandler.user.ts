/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyRequestWithContext,  SignPayload } from '@/definitions';
import { CACHE_SESSION_NAME, SESSION_EXPIRATION } from '@/definitions/cache';
import { addMinutes } from '@/utils/date';
import { FastifyReply } from 'fastify';
import { nanoid } from 'nanoid';

const JwApplyPostHandlerUser = async (req: FastifyRequestWithContext, reply: FastifyReply) => {
  const { tokenPayload, cachePayload } = getPayload(req.context.response, req.ips)
  const expireToken = addMinutes(SESSION_EXPIRATION);

  const token =  await reply.jwtSign({ internalId: cachePayload.internalId, userId: tokenPayload.user._id}, { expiresIn: "10 minute" })
  
  const refreshToken = await generateRefreshToken(req, reply, tokenPayload.user._id, cachePayload.internalId)

  await req.redis.set(`${CACHE_SESSION_NAME}${cachePayload.internalId}`, JSON.stringify(cachePayload), 'PXAT', addMinutes(SESSION_EXPIRATION).getTime());
  
  return {
    token,
    expireToken,
    refreshToken,
    ...tokenPayload
  };
};

const getPayload = (responseContext: any, ipRemote: string[]): SignPayload => {
  const internalId = nanoid(8);
  return {
    tokenPayload: {
      user: {
        source: 'user',
        ...responseContext
      },
    },
    cachePayload: {
      id: responseContext.id,
      internalId,
      user: {
        id: responseContext.id,
        source: 'user',
        email: responseContext.email,
        firstname: responseContext?.extras?.firstname,
        lastname: responseContext?.extras?.lastname
      },
      ipRemote
    }
  }
}

const generateRefreshToken = async (req: FastifyRequestWithContext, reply: FastifyReply, userId: string, internalId: string): Promise<string> => {
  const refreshTokenPayload = { internalId, userId };
  const refreshToken = await reply.jwtSign(refreshTokenPayload, {expiresIn: '14 days'});

  await req.redis.set(`${CACHE_SESSION_NAME}${refreshTokenPayload.userId}${refreshTokenPayload.internalId}`, JSON.stringify(refreshTokenPayload), 'PXAT', addMinutes(SESSION_EXPIRATION).getTime());

  return refreshToken;
}

export { JwApplyPostHandlerUser, generateRefreshToken };
