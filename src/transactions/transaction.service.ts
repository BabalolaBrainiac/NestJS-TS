import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from './transactions.model';
import { nanoid } from 'nanoid';
import { User } from 'src/users/users.models';
import { NotFoundError } from 'rxjs';

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

  findSingleTransaction(transactionId: string) {
    const tx = this.Transactions.find(
      (transaction) => transaction.id === transactionId,
    );
    if (!tx) {
      throw new NotFoundException();
    }
    return tx;
  }

  findAllTransactions() {
    return [...this.Transactions];
  }

  //First Operation performed when a credit tx is initiated
  sendAsset(
    sender: User,
    receiver: User,
    value: number,
    date: Date,
  ): Transaction {
    const transactionId = nanoid();
    const creditTransaction = new Transaction(
      transactionId,
      TransactionType.credit,
      value,
      date,
      TransactionStatus.pending,
      sender,
      receiver,
    );
    this.Transactions.push(creditTransaction);
    console.log('Transaction created');
    return creditTransaction;
  }

  async debit(
    transactionId: string,
    txStatus: TransactionStatus,
    value: number,
    sender: User,
  ): Promise<number> {
    const tx = await this.findSingleTransaction(transactionId);
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
        console.log('Sender Debited');
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
      const newBal = (await receiver.walletBalance) + value;
      receiver.walletBalance = newBal;
      console.log('Receiver Credited');
      return (txStatus = TransactionStatus.successful);
    }
  }

  verifySend(transactionId: string): TransactionStatus {
    const tx = this.Transactions.find((tx) => tx.id === transactionId);
    return tx.status;
  }
}
