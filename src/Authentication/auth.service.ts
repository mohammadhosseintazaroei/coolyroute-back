import { Injectable } from '@nestjs/common';
import { AuthModel } from './models/auth.model';

@Injectable()
export class AuthService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(): Promise<AuthModel> {
    return {} as any;
  }

  async findOneById(): Promise<AuthModel> {
    return {} as any;
  }

  async findAll(): Promise<AuthModel[]> {
    return [] as AuthModel[];
  }

  async remove(): Promise<boolean> {
    return true;
  }
}
