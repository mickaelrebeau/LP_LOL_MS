/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import { DecodePayloadType, FastifyRequestWithContext } from '@/definitions';
import { FastifyReply } from 'fastify';
import { getCache } from '@/utils/middleware';
import { unauthorizedPayload } from '@/utils/response';


const JwtMiddleware = async (req: FastifyRequestWithContext, reply: FastifyReply) => {

  const decode: DecodePayloadType = await req.jwtVerify();
  if (!decode) reply.code(401).send({ statusCode: 401, time: Date.now(), errors: { message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' } });


  const cache = await getCache(`${decode.internalId}`, req, reply)

  if (!cache) reply.code(401).send(unauthorizedPayload('Unauthorized - Missing or wrong JsonWebToken', 'NJTW-G-02'))
  
  req.user = {
    // @ts-ignore
    id: decode.userId
  }
  return true;

};





export default JwtMiddleware;
