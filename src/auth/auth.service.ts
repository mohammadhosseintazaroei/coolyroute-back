import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as speakeasy from 'speakeasy';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LoginDto, VerifyOtp } from './dto/auth.dto';
import { LoginVerification, UserVeify } from './models/auth.model';
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
  async generateCodeForUser(phoneNumber: string) {
    const otpSecret = this.generateOtp(phoneNumber);
    await this.repo.update(
      { phoneNumber },
      {
        activationCode: otpSecret,
        otpGeneratedTime: new Date(),
      },
    );
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
      now - user.otpGeneratedTime.getTime() < this.expiersTime * 1000
    ) {
      const remainingSeconds =
        this.expiersTime - (now - user.otpGeneratedTime.getTime()) / 1000;
      return {
        status: HttpStatus.ACCEPTED,
        message: `please wait for ${Math.floor(remainingSeconds)} second`,
        remainingSeconds: Math.floor(remainingSeconds),
      };
    }
    await this.generateCodeForUser(userInput.phoneNumber);
    return {
      status: HttpStatus.CREATED,
      message: 'کد فرستاده شده را وارد کنید',
    };
  }
  async renew(userInput: LoginDto): Promise<LoginVerification> {
    const user = await this.userService.getUserByPhoneNumber(
      userInput.phoneNumber,
    );
    if (!user) {
      throw new NotFoundException('not-found user');
    }

    await this.generateCodeForUser(userInput.phoneNumber);
    return {
      status: HttpStatus.CREATED,
      message: 'کد فرستاده شده را وارد کنید',
    };
  }
  async verifyUser({ code, phoneNumber }: VerifyOtp): Promise<UserVeify> {
    const user = await this.userService.getUserByPhoneNumber(phoneNumber);
    const now = await new Date().getTime();

    if (now - user.otpGeneratedTime.getTime() > this.expiersTime * 1000) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'کد فعلی منسوخ شده است، دوباره اقدام کنید',
      });
    }
    const userVerify = this.verifyOtp(phoneNumber, code);
    if (!userVerify) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'wrong code!',
      });
    }

    delete user.activationCode;
    const access_token = this.jwtService.sign({
      phoneNumber: user.phoneNumber,
      id: user.id,
    });

    return {
      status: HttpStatus.OK,
      message: 'verified successfuly',
      access_token,
      user,
    };
  }

  private deriveSecret(uniqueKey: string) {
    return crypto
      .createHmac('sha256', this.jwtSecret)
      .update(uniqueKey)
      .digest('base64');
  }
}
