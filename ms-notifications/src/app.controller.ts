import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('SEND_EMAIL')
  async sendEmail(
    @Payload() body :any
    ): Promise<any> {
    console.log("body", body)
    return{...body, message : "Baptiste was here"}
  }
}
