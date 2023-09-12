/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { userExchangeDto } from './dtos/userExchange.dto';
import { RpcSuccessInterceptor } from 'src/interceptors/RpcSuccessInterceptor';

@Controller('users')
@UseInterceptors(RpcSuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //pour le populate de ms.exchange pas toucher!!!
  @Post('/exchange')
  async createExchange(
    @Body(new ValidationPipe())
    userExchangeDto: userExchangeDto,
  ): Promise<User> {
    return await this.userService.createExchange(userExchangeDto);
  }

  // @Post('/exchange/pseudo')
  @MessagePattern('ARRAY_IDS')
  async getPseudo(
    @Body()
    body: string[],
  ): Promise<string[]> {
    return await this.userService.getPseudo(body);
  }

  //pour le ms-token
  // @Post('/token/email')
  @MessagePattern('GET_ID_BY_EMAIL')
  async getIdByEmail(
    // @Payload('body')
    @Body()
    body: // @Param()
    any,
  ): Promise<any> {
    const user = await this.userService.getIdByEmail(body.email);
    if (user) {
      //@ts-ignore
      return user._id;
    } else {
      return null;
    }
  }

  @MessagePattern('GET_EMAIL_BY_ID')
  async getEmailById(
    @Body()
    body: any,
  ): Promise<any> {
    console.log('id', body);
    const email = await this.userService.getEmailById(body);
    return {
      id: body,
      email: email,
    };
  }
  // fin de de ce que j'ai fait

  @MessagePattern('CHECK_PASSWORD')
  async checkPassword(
    @Payload('body') body: any,
    @Payload('user') user: any,
  ): Promise<boolean> {
    const checkPassword = await this.userService.verifyPassword(
      user.id,
      body.password,
    );
    if (checkPassword) {
      return true;
    }
  }

  @MessagePattern('USER_ID')
  async getUserById(@Payload('user') user: any): Promise<User> {
    console.log('user', user);
    const userById = await this.userService.getById(user.id);
    return userById;
  }

  @MessagePattern('UPDATE_USER')
  async updateUser(
    @Body('body') body: any,
    @Payload('user') user: any,
  ): Promise<User> {
    return await this.userService.update(user.id, body);
  }
}
