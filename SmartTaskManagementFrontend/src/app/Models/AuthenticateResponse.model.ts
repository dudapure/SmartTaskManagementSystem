import { User } from './user.model';

export interface AuthenticateResponse {
  token: string;
  user: User;
}
