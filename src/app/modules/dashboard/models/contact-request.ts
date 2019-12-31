import { User } from './user';

export interface ContactRequest {
  personalData: User;
  requestType: any;
  message: string;
}