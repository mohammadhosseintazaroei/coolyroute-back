import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  phoneNumber: string;
}

@InputType()
export class VerifyOtp extends LoginDto {
  @Field()
  code: string;
}
