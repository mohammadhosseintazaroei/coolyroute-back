import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginDto, VerifyOtp } from '../dto/auth.dto';
import { LoginVerification, UserVeify } from '../models/auth.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  async checkAuth() {
    return 'success';
  }
  @Query(() => LoginVerification)
  async login(@Args('user') user: LoginDto): Promise<LoginVerification> {
    return await this.authService.login(user);
  }

  @Query(() => UserVeify)
  async verifyOtp(@Args('user') user: VerifyOtp): Promise<UserVeify> {
    return await this.authService.verifyUser(user);
  }
}
