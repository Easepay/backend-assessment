import { IsDefined } from "class-validator";

export class ProductWaitlistResponseDto {
  @IsDefined()
  email: string;

  @IsDefined()
  fullname: string
}



