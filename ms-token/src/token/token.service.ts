import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ParamVerifToken } from 'src/interfaces/paramVerifToken';
import { isDiffBetweenTwoDate } from 'src/utils/diffBetweenTwoDate';
import { ResponseOtpCodeMatch } from 'src/interfaces/responseOtpCodeMatch';
import { generateRandomNumber } from 'src/utils/randomNumber';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
  ) {}

  async createTokenVerifEmail(user: string): Promise<Token> {
    await this.tokenModel.findOne({ user_id: user, type: 0 }).deleteOne();
    const token = await this.tokenModel.create({
      user_id: user,
      type: 0,
      token: uuidv4(),
    });
    return token;
  }

  async createTokenResetPassword(user: string): Promise<Token> {
    await this.tokenModel.findOne({ user_id: user, type: 1 }).deleteOne();
    const token = await this.tokenModel.create({
      user_id: user,
      type: 1,
      token: uuidv4(),
      otp_code: parseInt(generateRandomNumber()),
    });
    return token;
  }

  async getVerif(param: ParamVerifToken): Promise<Boolean> {
    const isToken = await this.tokenModel.findOne({
      _id: param.id,
      token: param.token,
      type: param.type,
    });
    if (isToken) {
      //verif email
      if (param.type == 0) {
        if (
          isDiffBetweenTwoDate(
            //@ts-ignore
            isToken.createdAt,
            new Date(),
            60,
          )
        ) {
          isToken.deleteOne();
        } else {
          isToken.deleteOne();
          return true;
        }
        // reset-password
      } else if (param.type == 1) {
        if (
          isDiffBetweenTwoDate(
            //@ts-ignore
            isToken.createdAt,
            new Date(),
            5,
          )
        ) {
          isToken.deleteOne();
        } else {
          return true;
        }
      }
    }
    // no data
    return false;
  }

  async otpCodeMatch(
    param: ParamVerifToken,
    otp_code: number,
  ): Promise<{ data: ResponseOtpCodeMatch }> {
    const isToken = await this.getVerif(param);
    let message = 'time out';
    let isMatch = false;
    if (isToken) {
      const token = await this.tokenModel.findOne({
        _id: param.id,
        token: param.token,
        type: param.type,
      });
      if (token.otp_code == otp_code) {
        token.deleteOne();
        message = 'code correct';
        isMatch = true;
      } else {
        if (token.nbTry >= 4) {
          token.deleteOne();
          isMatch = false;
          message = 'No more try available';
        } else {
          await this.tokenModel.updateOne(
            {
              _id: param.id,
              token: param.token,
              type: param.type,
            },
            { nbTry: token.nbTry + 1 },
          );
          isMatch = false;
          message = `${4 - token.nbTry} more attempts`;
        }
      }
    }
    return {
      data: {
        isMatch,
        message,
      },
    };
  }
}
