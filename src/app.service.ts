import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testService(): string {
    return 'Test Service!';
  }
}
