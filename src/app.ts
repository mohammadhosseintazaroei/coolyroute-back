import { Module } from '@nestjs/common';
import { AuthController } from './Authentication/controller/auth.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
