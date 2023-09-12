/* eslint-disable prettier/prettier */
import { Controller, NotFoundException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthDto } from './dtos/auth.dto';
import { CreateUserDto } from 'src/user/dtos/user.dto';
import { RpcSuccessInterceptor } from 'src/interceptors/RpcSuccessInterceptor';
import { HermesService } from '@app/hermes';

@Controller('auth')
@UseInterceptors(RpcSuccessInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly hermes: HermesService,
  ) {}

  @MessagePattern('SIGNUP')
  async signup(@Payload('body') body: CreateUserDto) {
    const newUser = await this.authService.signUp(body);
    const userId = newUser.id;
    const res = await this.hermes.send('CREATE_TOKEN_VERIF_EMAIL', userId);

    return newUser;
  }

  @MessagePattern('LOGIN')
  async signIn(@Payload('body') body: AuthDto) {
    try {
      const auth = await this.authService.signIn(body);
      return auth;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @MessagePattern('REFRESH_TOKEN')
  async refreshToken(@Payload('body') body: any) {
    return body;
  }

  @MessagePattern('RESET_PASSWORD')
  async resetPassword(@Payload('body') body: any) {
    try {
      await this.hermes.emit('resetPassword', { body });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
