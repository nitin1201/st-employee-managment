import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from '../seeder/seeder.service';
import { UsersSchema } from 'src/entities/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/repositories/users.repository';
import { UserTokenSchema } from 'src/entities/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: 'UserToken', schema: UserTokenSchema }]),
  ],
  providers: [UsersService, UsersRepository, SeederService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}