import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService], 
  exports: [EmailService], // Exportez le service si d'autres modules en ont besoin
})
export class EmailModule {}