import { User } from 'src/users/interfaces/user.interface';

export interface Permission {
  permissions?: string[];
  user?: User;
  deleted?: boolean;
}
