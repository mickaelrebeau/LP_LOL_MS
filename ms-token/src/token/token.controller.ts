import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { HermesService } from 'libs/hermes/src';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Token } from './schemas/token.schema';
import { ParamVerifToken } from 'src/interfaces/paramVerifToken';
import { ResponseVerifToken } from 'src/interfaces/responseVerifUrl';
import { OtpCodeMatching } from 'src/interfaces/otpCodeMatching';
import { ResponseOtpCodeMatch } from 'src/interfaces/responseOtpCodeMatch';
import { RpcSuccessInterceptor } from 'src/interceptors/RpcSuccessInterceptor';

@Controller('token')
@UseInterceptors(RpcSuccessInterceptor)
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly hermes: HermesService,
  ) {}

  // @Post()
  @MessagePattern('CREATE_TOKEN_VERIF_EMAIL')
  async createTokenVerifEmail(
    @Payload()
    userId: string,
  ): Promise<Token | { res: string }> {
    console.log('body', userId);
    if (userId) {
      const user = await this.hermes.send('GET_EMAIL_BY_ID', userId);
      if (user) {
        console.log(user);
        const token = await this.tokenService.createTokenVerifEmail(
          user.datas.id,
        );
        console.log('token', token);
        // envoi de l'email avec user.email
        return token;
      } else {
        console.log('nope');
        return { res: 'something bad happen, maybe wrong or incorrect id' };
      }
    } else {
      return { res: 'body undefined' };
    }
  }

  // @Post('/reset-password')
  @MessagePattern('CREATE_TOKEN_RESET_PASSWORD')
  async createTokenResetPassword(
    @Payload('body')
    body: any,
  ): Promise<Token | { res: string }> {
    const user = await this.hermes.send('GET_ID_BY_EMAIL', body);
    if (user) {
      const token = await this.tokenService.createTokenResetPassword(user);
      console.log('token', token);
      // envoi de l'email avec body.email
      return token;
    } else {
      console.log('nope');
      return { res: 'wrong email' };
    }
  }

  // @Get('verification/:token/:id/:type')
  @MessagePattern('VERIFICATION_EMAIL')
  async getVerifEmail(
    // @Param()
    @Payload('params')
    params: ParamVerifToken,
  ): Promise<{ data: ResponseVerifToken }> {
    // console.log('param', params);
    const isToken = await this.tokenService.getVerif(params);
    if (isToken) {
      return {
        data: {
          isValid: isToken,
          message: 'Url valid',
        },
      };
    } else {
      return {
        data: {
          isValid: isToken,
          message: 'Url invalid',
        },
      };
    }
  }

  // @Get('reset-password/:token/:id/:type')
  @MessagePattern('VERIFICATION_RESET_PASSWORD_URL')
  async getResetPassword(
    // @Param()
    @Payload('params')
    params: ParamVerifToken,
  ): Promise<{ data: ResponseVerifToken }> {
    const isToken = await this.tokenService.getVerif(params);
    let message = 'is valid';
    if (!isToken) message = 'is unvalid';

    return {
      data: {
        isValid: isToken,
        message,
      },
    };
  }

  // @Post('reset-password/:token/:id/:type')
  @MessagePattern('MATCHING_OPT_CODE')
  async compareOtpCode(
    // @Param()
    @Payload('params')
    params: ParamVerifToken,
    // @Body()
    @Payload('body')
    body: OtpCodeMatching,
  ): Promise<{ data: ResponseOtpCodeMatch }> {
    console.log('body', body);
    const isOptCodeMatched = await this.tokenService.otpCodeMatch(
      params,
      body.otp_code,
    );
    return isOptCodeMatched;
  }
}
