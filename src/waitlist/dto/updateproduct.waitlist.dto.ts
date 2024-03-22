import { IsEmail } from 'class-validator';

export class UpdateProductWaitlistDTO {
  @IsEmail()
  email: string;

}
