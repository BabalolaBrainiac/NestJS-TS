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

  async updateTransaction(transactionId: string, updatedStatus: TransactionStatus, updatedType: TransactionType): Promise<Transaction> {
    const tx = await this.findSingleTransaction(transactionId)
    if (!tx) {
      throw new NotFoundError('Transaction Not Found')
    } else {
      

    }
    return tx
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
  ): Promise<boolean> {
    let isdebited = false;
    const tx = await this.findSingleTransaction(transactionId);
    if (!tx) {
      throw new NotFoundError('Transaction Not Found');
      return isdebited;
    } else if (
      tx &&
      txStatus === TransactionStatus.pending &&
      sender.walletBalance < value
    ) {
      console.error('Insufficient Funds');
      return isdebited;
    } else if (
      tx &&
      tx.status === TransactionStatus.pending &&
      sender.walletBalance >= value
    ) {
      {
        const newBal = (await sender.walletBalance) - value;
        sender.walletBalance = newBal;
        isdebited = true;
        console.log('Sender Debited');
        return isdebited;
      }
    }
  }

  async credit(
    transactionId: string,
    txStatus: TransactionStatus,
    value: number,
    receiver: User,
  ): Promise<boolean> {
    let isCredited = false;
    const tx = await this.findSingleTransaction(transactionId);
    if (!tx) {
      throw new NotFoundError('Transaction Not Found');
    } else if (tx && txStatus === TransactionStatus.pending) {
      const newBal = (await receiver.walletBalance) + value;
      receiver.walletBalance = newBal;
      isCredited = true;
      console.log('Receiver Credited');
      return isCredited;
    }
  }

  verifySend(transactionId: string): TransactionStatus {
    const tx = this.Transactions.find((tx) => tx.id === transactionId);
    return tx.status;
  }

  veryifyCreditandDebit(
    creditStatus: boolean,
    debitStatus: boolean,
    transactionStatus: TransactionStatus,
  ): TransactionStatus {
    if (creditStatus && debitStatus = true) {
      return transactionStatus = transactionStatus.
    }
  }
}
