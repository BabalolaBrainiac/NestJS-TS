import { User } from 'src/users/users.models';
import { TransactionStatus } from './transactions.model';

export interface TransactionPayload {
  id: string;
  status: TransactionStatus;
  sender: User;
  receiver: User;
  value: number;
  date: Date;
}
