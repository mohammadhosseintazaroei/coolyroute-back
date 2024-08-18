import { Args, Query, Resolver } from '@nestjs/graphql';
import { GQLAuth } from '../auth.decorator';
import { AuthService } from '../auth.service';
import { LoginDto, VerifyOtp } from '../dto/auth.dto';
import { LoginVerification, UserVeify } from '../models/auth.model';
import { RoleType } from '../roles.enum';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @GQLAuth(RoleType.normal)
  @Query(() => String)
  async checkAuth() {
    return 'success';
  }
  @Query(() => LoginVerification)
  async login(@Args('user') user: LoginDto): Promise<LoginVerification> {
    return await this.authService.login(user);
  }
  // TODO : remove or fix it later :)
  // @Query(() => LoginVerification)
  // async renew(@Args('user') user: LoginDto): Promise<LoginVerification> {
  //   return await this.authService.renew(user);
  // }

  @Query(() => UserVeify)
  async verifyOtp(@Args('user') user: VerifyOtp): Promise<UserVeify> {
    return await this.authService.verifyUser(user);
  }
}
