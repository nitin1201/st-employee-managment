import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.schema';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async run() {
    try {
      const existingUser = await this.userModel
        .findOne({ email: 'hr@solutionstree.org' })
        .exec();
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash('solution@123', 10);
        const user = new this.userModel({
          userName: 'Neha@01',
          firstName: 'Neha',
          lastName: 'Dhiman',
          email: 'hr@solutionstree.org',
          Phone: '9876546734',
          joiningDate: '01-08-2024',
          profileImageUrl: 'bg-img22.jpg',
          status: 'working',
          role: 'HR',
          password: hashedPassword,
        });
        await user.save();
        this.logger.log('User seeded successfully');
      } else {
        this.logger.log('User already exists');
      }
    } catch (error) {
      this.logger.error('Error during seeding', error.stack);
    }
  }
}
