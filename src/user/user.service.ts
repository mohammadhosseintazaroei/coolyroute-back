import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { VerifyOtp } from 'src/auth/dto/auth.dto';
import { UserModelSafe } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return this.repo.find({ relations: { userSkills: true } });
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<UserEntity> {
    return this.repo.findOne({
      where: { phoneNumber },
      relations: ['userSkills', 'userSkills.skill'],
    });
  }

  async registerUserByPhoneNumber(phoneNumber: string) {
    const user = new UserEntity();
    user.phoneNumber = phoneNumber;
    // user.activationCode =
    await this.repo.save(user);
    return {
      status: HttpStatus.CREATED,
      message: 'user created successfuly',
    };
  }

  async profile(user: VerifyOtp): Promise<UserModelSafe> {
    const foundUser = await this.getUserByPhoneNumber(user.phoneNumber);
    delete foundUser.activationCode;
    if (foundUser) return foundUser;
  }
}
