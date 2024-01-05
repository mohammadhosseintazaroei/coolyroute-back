import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginDto, VerifyOtp } from '../dto/auth.dto';
import { LoginVerification, UserVeify } from '../models/auth.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => LoginVerification)
  async login(@Args('user') user: LoginDto): Promise<LoginVerification> {
    return await this.authService.login(user);
  }

  @Query(() => UserVeify)
  async verifyOtp(@Args('user') user: VerifyOtp): Promise<UserVeify> {
    return await this.authService.verifyUser(user);
  }
}
