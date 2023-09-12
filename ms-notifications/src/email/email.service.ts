import { Injectable } from '@nestjs/common';
//import { SibApiV3Sdk, SendSmtpEmail } from 'sib-api-v3-typescript';

import * as SibApiV3Sdk from 'sib-api-v3-typescript';
import { SendSmtpEmail } from 'sib-api-v3-typescript'


@Injectable()
export class EmailService{
  private readonly sendinblue: SibApiV3Sdk.TransactionalEmailsApi;
  
  constructor() {
    this.sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
    this.sendinblue.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.API_KEY);
  }
  
  async sendConfirmationEmail(email: string, name: string, confirmationLink: string): Promise<void> {
    const sendSmtpEmail: SendSmtpEmail = {
      to: [{ email, name }],
      templateId: 4,
      params: { name, confirmationLink },
    };

    try {
      await this.sendinblue.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      console.error('Error sending confirmation email:', error.message);
      throw new Error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de confirmation.');
    }
  }

  async sendResetPasswordEmail(
    email: string,
    name: string,
    resetPasswordLink: string,
  ): Promise<void> {
    const sendSmtpEmail: SendSmtpEmail = {
      to: [{ email, name }],
      templateId: 6,
      params: { name, resetPasswordLink },
    };

    try {
      await this.sendinblue.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      console.error('Error sending reset password email:', error.message);
      throw new Error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de réinitialisation du mot de passe.');
    }
  }

  }