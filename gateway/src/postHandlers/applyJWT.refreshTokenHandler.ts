/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyRequestWithContext } from '@/definitions';
import { FastifyReply } from 'fastify';
import { generateRefreshToken } from './applyJWT.postHandler.user';
import { CACHE_SESSION_NAME } from '@/definitions/cache';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function refreshTokenHandler(req: FastifyRequestWithContext, reply: FastifyReply) {
  try {
    const decodedRefreshToken = await req.jwtVerify();
    console.log(decodedRefreshToken);

    const existingRefreshToken = await req.redis.get(`${CACHE_SESSION_NAME}${decodedRefreshToken.userId}${decodedRefreshToken.internalId}`)
    if (!existingRefreshToken) {
      throw new Error('Invalid or expired refresh token');
    }

    const token = await reply.jwtSign(decodedRefreshToken, {expiresIn: '1 hour'});

    const refreshToken = await generateRefreshToken(req, reply, decodedRefreshToken.userId, decodedRefreshToken.internalId);

    reply.code(200).send({
      statusCode: 200,
      time: Date.now(),
      datas: {
        token,
        refreshToken,
      }
    })
  } catch (error) {
    console.log('Refresh token error:', error);
    throw new Error('Invalid or expired refresh token');
  }
}

export default refreshTokenHandler;
