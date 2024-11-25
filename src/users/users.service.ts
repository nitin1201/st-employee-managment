import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from 'src/entities/users.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/LoginDto';
import { UsersRepository } from 'src/repositories/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserToken } from 'src/entities/auth.schema';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
    @InjectModel('UserToken') private readonly userTokenModel: Model<UserToken>,
  ) {}

  //SignUpDto
  async signUp(
    signUpData: SignUpDto,
  ): Promise<{ user: Users; message: string }> {
    const {
      userName,firstName,lastName,email,Phone,joiningDate,status,role,password,
    } = signUpData;
    const existingUser = await this.usersRepository.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.saveUser({
      userName,firstName,lastName,email,Phone: String(Phone),
      joiningDate,status,password: hashedPassword,role,
    });
    return {
      user,
      message: 'User registered.',
    };
  }
  //log-in
  async login(
    loginData: LoginDto,
  ): Promise<{ message: string; token: string }> {
    const { email, password } = loginData;
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: '5m',
    });
    const generatedAt = new Date();
    const expiresAt = new Date(generatedAt.getTime() + 5 * 60 * 1000); // 5 minutes from now
    const userToken = new this.userTokenModel({
      userId: user._id,
      email,
      token,
      generatedAt,
      expiresAt,
    });
    await userToken.save();
    return {
      message: 'Login successfully 🤖',
      token,
    };
  }
}