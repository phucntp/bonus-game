import { User } from 'src/users/interfaces/user.interface';

export interface Bonus {
  numberMember?: number;
  numberBonus?: number;
  sent?: boolean;
  ip?: string;
  implementer?: User;
  date?: string;
  deleted?: boolean;
}
