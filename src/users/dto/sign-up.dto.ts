import {
  IsEmail,IsNotEmpty,IsString,IsEnum,IsNumber,IsDate,IsUrl,
} from 'class-validator';
import { UserRole } from 'src/enum';
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  Phone: Number;

  @IsNotEmpty()
  @IsDate()
  joiningDate: Date;

  @IsNotEmpty()
  @IsUrl()
  profileImageUrl: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  password: string;
}
