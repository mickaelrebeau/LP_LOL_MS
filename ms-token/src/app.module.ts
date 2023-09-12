import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './token/token.controller';
import { TokenModule } from './token/token.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
    MongooseModule.forRoot(
      'mongodb+srv://johndrone2:Vc3qZ1VfBG02GXl9@lp-lol.imjwyuj.mongodb.net/admin?retryWrites=true&replicaSet=atlas-141jab-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',
      {
        dbName: 'ms-token',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
