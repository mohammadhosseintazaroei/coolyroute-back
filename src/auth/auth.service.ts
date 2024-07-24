import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as speakeasy from 'speakeasy';
import { UserService } from 'src/user/user.service';
import { LoginDto, VerifyOtp } from './dto/auth.dto';
import { LoginVerification, UserVeify } from './models/auth.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private expiersTime = 2 * 60;

  private jwtSecret = process.env.JWT_SECRET;
  generateOtp(uniqueKey: string) {
    const derivedSecret = this.deriveSecret(uniqueKey);
    const otpCode = speakeasy.totp({
      secret: derivedSecret,
      encoding: 'base64',
      step: this.expiersTime,
    });
    console.log('otp code :', otpCode);
    const derivedOtpCode = this.deriveSecret(otpCode);
    return derivedOtpCode;
  }
  verifyOtp(uniqueKey: string, token: string) {
    const derivedSecret = this.deriveSecret(uniqueKey);
    return speakeasy.totp.verify({
      secret: derivedSecret,
      encoding: 'base64',
      step: this.expiersTime,
      token: token,
      window: 1,
    });
  }

  async login(userInput: LoginDto): Promise<LoginVerification> {
    const user = await this.userService.getUserByPhoneNumber(
      userInput.phoneNumber,
    );
    if (!user) {
      await this.userService.registerUserByPhoneNumber(userInput.phoneNumber);
    }
    const now = await new Date().getTime();

    if (
      user &&
      user.activationCode &&
      now - user.otpGeneratedTime.getTime() < 2 * 60 * 1000
    ) {
      const remainingSeconds = now - user.otpGeneratedTime.getTime();
      throw new BadRequestException({
        status: HttpStatus.CREATED,
        message: `please wait for ${Math.floor(
          this.expiersTime - remainingSeconds / 1000,
        )} second`,
      });
    }
    const otpSecret = this.generateOtp(userInput.phoneNumber);
    await this.repo.update(
      { phoneNumber: userInput.phoneNumber },
      {
        activationCode: otpSecret,
        otpGeneratedTime: new Date(),
      },
    );
    return {
      status: HttpStatus.CREATED,
      message: 'otpCode send successfuly',
    };
  }
  async verifyUser(user: VerifyOtp): Promise<UserVeify> {
    const userVerify = this.verifyOtp(user.phoneNumber, user.code);

    if (!userVerify) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'wrong code!',
      });
    }
    const userInfo = await this.userService.getUserByPhoneNumber(
      user.phoneNumber,
    );

    delete userInfo.activationCode;
    const access_token = this.jwtService.sign(user);
    return {
      status: HttpStatus.OK,
      message: 'verified successfuly',
      access_token,
      user: userInfo,
    };
  }

  private deriveSecret(uniqueKey: string) {
    return crypto
      .createHmac('sha256', this.jwtSecret)
      .update(uniqueKey)
      .digest('base64');
  }
}
