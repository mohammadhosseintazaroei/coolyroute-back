import { IUser } from 'src/user/interfaces/user.interface';

export interface ISKill {
  id: number;
  name: string;
  description?: string;
  users: IUser[];
}
