import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/entities/users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async findOneByEmail(email: string): Promise<Users | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async saveUser(userData: Partial<Users>): Promise<Users> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find();
  }
}
