import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ProductWaitlistDTO {
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(1)
  fullname: string;
}
