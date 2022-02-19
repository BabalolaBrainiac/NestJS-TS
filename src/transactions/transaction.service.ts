// import { Injectable } from '@nestjs/common';
// import {
//   Transaction,
//   TransactionStatus,
//   TransactionType,
// } from './transactions.model';
// import { nanoid } from 'nanoid';
// import { User } from 'src/users/users.models';

// @Injectable()
// export class TransactionService {
//   private readonly Transactions: Transaction[] = [];

//   createTransaction(
//     type: TransactionType,
//     value: number,
//     date: Date,
//     status: TransactionStatus,
//     sender: User,
//     receiver: User,
//   ) {
//     const transactionId = nanoid();
//     const newTransaction = new Transaction(
//       transactionId,
//       type,
//       value,
//       date,
//       status,
//       sender,
//       receiver,
//     );
//     this.Transactions.push(newTransaction);
//   }

//   findTransaction(id: string): any {}

//   sendAsset(
//     sender: User,
//     receiver: User,
//     value: number,
//     date: Date,
//   ): TransactionStatus {
//     const transactionId = nanoid();
//     const trnsDate = new Date();
//     const creditTransaction = new Transaction(
//       transactionId,
//       TransactionType.credit,
//       value,
//       trnsDate,
//       TransactionStatus.pending,
//       sender,
//       receiver,
//     );
//     return TransactionStatus.pending;
//   }
// }
