import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Users } from 'src/entities/users.schema';
import { LoginDto } from './dto/LoginDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Sign-up route
  @Post('signup')
  @HttpCode(201)
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ data: Users; message: string }> {
    const { user, message } = await this.usersService.signUp(signUpDto);
    return { data: user, message };
  }

  // Log-in route
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string; data: { token: string } }> {
    const { message, token } = await this.usersService.login(loginDto);
    return { message, data: { token } };
  }
}
