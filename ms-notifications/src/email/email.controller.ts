import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';
import { HermesService } from '../../libs/hermes/src/hermes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

// local
// @Controller('email')
// export class EmailController {
//   constructor(private readonly emailService: EmailService) {}

//   @Post('send-confirmation')
//   async sendConfirmationEmail(@Body() emailDto: EmailDto) {

//     const confirmationLink = `ici le lien`;

//     await this.emailService.sendConfirmationEmail(emailDto.to, emailDto.name, confirmationLink);

//     return { message: 'Confirmation email sent successfully' };
//   }

//   @Post('send-reset-password')
//   async sendResetPasswordEmail(@Body() emailDto: EmailDto) {

//     const resetPasswordLink = `ici le lien`;

//     await this.emailService.sendResetPasswordEmail(emailDto.to, emailDto.name, resetPasswordLink);

//     return { message: 'Reset password email sent successfully' };
//   }
// }

//nats / hermes

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly hermes: HermesService,
  ) {}

  @MessagePattern('sendConfirmationEmail')
  async sendConfirmationEmail(@Payload() emailDto: EmailDto) {
    const confirmationLink = `TOKEN`; // recup de ton dto
    const link ="https://domain.com/verifyAccount/"+emailDto.token
    try {
      await this.emailService.sendConfirmationEmail(
        emailDto.to,
        emailDto.name,
        link,
      );
      return {
        status: 'success',
        message: 'Confirmation email sent successfully',
      };
    } catch (error) {
      console.error(`Error sending confirmation email: ${error.message}`);
      throw new InternalServerErrorException(
        'An error occurred while sending confirmation email',
      );
    }
  }

  @MessagePattern('sendResetPasswordEmail')
  async sendResetPasswordEmail(@Payload() emailDto: EmailDto) {
    const resetPasswordLink = `TOKEN`;
    const link ="https://domain.com/resetpassword/"+emailDto.token

    try {
      await this.emailService.sendResetPasswordEmail(
        emailDto.to,
        emailDto.name,
        link,
      );
      return {
        status: 'success',
        message: 'Password reset email sent successfully',
      };
    } catch (error) {
      console.error(`Error sending reset password email: ${error.message}`);
      throw new InternalServerErrorException(
        'An error occurred while sending password reset email',
      );
    }
  }
}
