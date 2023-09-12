/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/userUpdate.dto';
import * as argon2 from 'argon2';
import { userExchangeDto } from './dtos/userExchange.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async create(createUserDTO: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDTO);
    return createdUser.save();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async getById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async deleteOneById(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndRemove(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findbyPseudo(pseudo: string): Promise<UserDocument> {
    return this.userModel.findOne({ pseudo });
  }

  //pour le plulate de ms-exchange pas toucher
  async createExchange(body: userExchangeDto): Promise<User> {
    return await this.userModel.create(body);
  }

  async getPseudo(body: string[]): Promise<string[]> {
    const res = [];
    for (const iterator of body) {
      const user = await this.userModel.findById(iterator);
      res.push(user.pseudo);
    }
    return res;
  }

  //pour le ms-token
  async getIdByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async getEmailById(id: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: id });
    console.log('user', user);
    return user.email;
  }

  async updateStatus(userId: string, status: boolean): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { status }, { new: true });
  }

  async updateEmail(userId: any, newEmail: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true },
    );
  }

  async updatePassword(userId: string, newPassword: string): Promise<User> {
    const hashedPassword = await this.hashData(newPassword);

    return this.userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
  }

  async verifyPassword(userId: any, password: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    return isPasswordValid;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
