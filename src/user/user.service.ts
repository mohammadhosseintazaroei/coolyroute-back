import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyOtp } from 'src/auth/dto/auth.dto';
import { UserSkillEntity } from 'src/user-skill/user-skill.entity';
import { Repository } from 'typeorm';
import { CompleteFurtherInformationDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserModelSafe } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    @InjectRepository(UserSkillEntity)
    private readonly userSkillRepo: Repository<UserSkillEntity>,
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
    if (foundUser)
      return {
        ...foundUser,
        isComplete: !!(
          foundUser.firstName &&
          foundUser.lastName &&
          foundUser.userSkills.length
        ),
      };
    throw new NotFoundException('not-found user');
  }

  async completeFurtherInformation(
    userId: number,
    data: CompleteFurtherInformationDto,
  ) {
    const { firstName, lastName, skillId } = data;
    if (firstName || lastName) {
      await this.repo.update({ id: userId }, { firstName, lastName });
    }
    const userSkill = await this.userSkillRepo.findOne({
      where: { userId, skillId },
    });
    if (userSkill) {
      return true;
    }
    const createUserSkill = await this.userSkillRepo.create({
      userId,
      skillId,
    });

    await this.userSkillRepo.save(createUserSkill);
    return true;
  }
}
