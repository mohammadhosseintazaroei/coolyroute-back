import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';
@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private repo: Repository<EnrollmentEntity>,
  ) {}
  async getAllEnrollments(): Promise<EnrollmentEntity[]> {
    return await this.repo.find({ relations: ['event', 'user'] });
  }
}
