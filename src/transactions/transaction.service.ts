import { Injectable } from '@nestjs/common';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from './transactions.model';
import { nanoid } from 'nanoid';
import { User } from 'src/users/users.models';

@Injectable()
export class TransactionService {
  private readonly Transactions: Transaction[] = [];

  createTransaction(
    type: TransactionType,
    value: number,
    date: Date,
    status: TransactionStatus,
    sender: User,
    receiver: User,
  ) {
    const transactionId = nanoid();
    const newTransaction = new Transaction(
      transactionId,
      type,
      value,
      date,
      status,
      sender,
      receiver,
    );
    this.Transactions.push(newTransaction);
  }

  async findSingleTransaction(transactionId: string): Promise<Transaction> {
    const tx = await this.Transactions.find[transactionId];
    return tx;
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return [...this.Transactions];
  }

  async debit(
    transactionId: number,
    txStatus: TransactionStatus,
    value: number,
    sender: User,
  ): Promise<number> {
    const tx = await this.Transactions.find[transactionId];
    if (!tx) {
      console.error('Transaction Not Found');
    } else if (
      tx &&
      txStatus === TransactionStatus.pending &&
      sender.walletBalance < value
    ) {
      console.error('Insufficient Sender Funds');
    } else if (
      tx &&
      tx.status === TransactionStatus.pending &&
      sender.walletBalance >= value
    ) {
      {
        const newBal = (await sender.walletBalance) - value;
        sender.walletBalance = newBal;
        return sender.walletBalance;
      }
    }
  }

  async credit(
    transactionId: number,
    txStatus: TransactionStatus,
    value: number,
    receiver: User,
  ): Promise<number> {
    const tx = await this.Transactions.find[transactionId];
    if (!tx) {
      console.error('Transaction Not Found');
    } else if (tx && txStatus === TransactionStatus.pending) {
      const newBal = receiver.walletBalance + value;
      receiver.walletBalance = newBal;
      return receiver.walletBalance;
    }
  }

  sendAsset(
    sender: User,
    receiver: User,
    value: number,
    date: Date,
  ): Transaction {
    const transactionId = nanoid();
    const trnsDate = new Date();
    const creditTransaction = new Transaction(
      transactionId,
      TransactionType.credit,
      value,
      trnsDate,
      TransactionStatus.pending,
      sender,
      receiver,
    );
    return creditTransaction;
  }
  async verifySend(transaction: Transaction) {}
}
