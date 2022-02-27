import { send } from 'process';
import { User } from 'src/users/users.models';

// Custom Enum Types
export enum TransactionStatus {
  pending,
  successful,
  failed,
}
export enum TransactionType {
  credit,
  debit,
}

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly type: TransactionType,
    public readonly value: number,
    public readonly date: Date,
    public readonly status: TransactionStatus,
    public readonly sender: User,
    public readonly receiver: User,
  ) {}
}
