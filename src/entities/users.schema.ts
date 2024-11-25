import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { UserRole } from 'src/enum';

@Schema()
export class Users extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  Phone: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, type: Date })
  joiningDate: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
