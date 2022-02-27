import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Transaction } from './transactions.model';
import { TransactionService } from './transaction.service';
import { TransactionPayload } from './verify.transaction.dto';
import { send } from 'process';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  //Find Single Transaction
  @Get(':transactionId')
  findTransaction(@Param('transactionId') txId: string): Transaction {
    const tx = this.transactionService.findSingleTransaction(txId);
    return tx;
  }

  //Return all Transactions
  @Get('list')
  findAll(): Transaction[] {
    const transactions = this.transactionService.findAllTransactions();
    return transactions;
  }

  //Initiate Send Transaction
  @Post('send')
  async sendMoney(@Param() params: TransactionPayload) {
    const { id, sender, receiver, value, date } = params;
    const creditTx = await this.transactionService.sendAsset(
      sender,
      receiver,
      value,
      new Date(),
    );
    if (!creditTx) {
      throw new UnauthorizedException();
    } else {
      const isDebited = await this.transactionService.debit(
        creditTx.id,
        creditTx.status,
        creditTx.value,
        creditTx.sender,
      );
      const isCredited = await this.transactionService.credit(
        creditTx.id,
        creditTx.status,
        creditTx.value,
        creditTx.receiver,
      );
      if (isCredited && isDebited == true) {
      }
    }
  }
}
