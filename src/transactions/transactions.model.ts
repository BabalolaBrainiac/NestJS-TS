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
    private readonly type: TransactionType,
    private readonly value: number,
    private readonly date: Date,
    public readonly status: TransactionStatus,
    private readonly sender: User,
    private readonly receiver: User,
  ) {}
}
