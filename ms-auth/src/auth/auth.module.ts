import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { HermesModule } from '@app/hermes';

@Module({
  imports:[
    UserModule,
    HermesModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ]
})
export class AuthModule {}
