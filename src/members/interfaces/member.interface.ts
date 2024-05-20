import { User } from 'src/users/interfaces/user.interface';

export interface Member {
  quantity?: number;
  betAmount?: number;
  timesJoin?: number;
  timesRest?: number;
  ip?: string;
  admin?: User;
  deleted?: boolean;
  code?: string;
  _id?: string;
}
