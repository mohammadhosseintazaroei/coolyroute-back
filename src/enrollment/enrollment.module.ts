import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentResolver } from './resolver/enrollment.resolver';
import { EnrollmentEntity } from './enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentEntity])],
  providers: [EnrollmentResolver, EnrollmentService],
})
export class EnrollmentModule {}
