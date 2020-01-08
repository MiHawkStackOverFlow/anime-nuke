import { User } from './user';

export interface Order {
  personalData: User;
  items: Array<any>;
}