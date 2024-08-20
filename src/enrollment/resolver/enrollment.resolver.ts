import { Query, Resolver } from '@nestjs/graphql';
import { EnrollmentService } from '../enrollment.service';
import { EnrollmentEntity } from '../enrollment.entity';
import { EnrollmentModel } from '../models/enrollment.model';

@Resolver('Auth')
export class EnrollmentResolver {
  constructor(private enrollmentService: EnrollmentService) {}

  @Query(() => [EnrollmentModel])
  async getAllEnrollments(): Promise<EnrollmentEntity[]> {
    return await this.enrollmentService.getAllEnrollments();
  }
}
