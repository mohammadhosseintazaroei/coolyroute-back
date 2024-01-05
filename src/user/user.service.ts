import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<UserEntity> {
    return this.repo.findOne({ where: { phoneNumber } });
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
}
