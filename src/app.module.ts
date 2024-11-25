import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SeederService } from './seeder/seeder.service';
import { Users, UsersSchema } from './entities/users.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    UsersModule,
  ],
  providers: [SeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}
  async onModuleInit() {
    await this.seederService.run(); 
  }
}
