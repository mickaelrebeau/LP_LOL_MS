/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dtos/auth.dto';
import * as argon2 from 'argon2';
import { UserDocument } from 'src/user/schemas/user.schema';
import { HermesService } from '@app/hermes/hermes.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hermes: HermesService,
  ) {}

  async signUp(createUserDTO: CreateUserDto) {
    const userExists = await this.userService.findbyPseudo(
      createUserDTO.pseudo,
    );
    const emailExists = await this.userService.findByEmail(createUserDTO.email);

    if (userExists || emailExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await this.hashData(createUserDTO.password);
    const newUser = await this.userService.create({
      ...createUserDTO,
      password: hash,
    });
    return newUser;
  }

  //   async getAccountVerificationToken(userId: string): Promise<any> {
  //     try {
  //       return firstValueFrom(
  //         await this.hermes.send('getAccountVerificationToken', { userId }),
  //       );
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération du token:', error);
  //       throw error;
  //     }
  //   }

  //   async sendEmailValidationAccount(
  //     userId: string,
  //     userEmail: string,
  //   ): Promise<void> {
  //     const verificationToken = uuidv4();

  //     try {
  //       await this.hermes.emit('sendEmailValidation', {
  //         userId,
  //         userEmail,
  //         verificationToken,
  //       });
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de l'envoi de l'e-mail de validation du compte:",
  //         error,
  //       );
  //       throw error;
  //     }
  //   }

  async signIn(body: AuthDto): Promise<UserDocument> {
    try {
      const user = await this.userService.findByEmail(body.email);
      const passwordMatches = await argon2.verify(user.password, body.password);

      if (user.email !== body.email || !passwordMatches) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async resetPassword(body: any): Promise<any> {
    try {
      await this.hermes.emit('resetPassword', {
        body,
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de réinitialisation de mot de passe:",
        error,
      );
      throw error;
    }
  }

  async invalidateToken(token: string): Promise<void> {
    const blacklistedToken = await this.blacklistToken(token);
    if (!blacklistedToken) {
      throw new UnauthorizedException("Le token fourni n'est pas valide.");
    }
  }

  private async blacklistToken(token: string): Promise<boolean> {
    const blacklistedTokens = new Set<string>();
    blacklistedTokens.add(token);
    return blacklistedTokens.has(token);
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}

