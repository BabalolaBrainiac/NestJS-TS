import { Controller, Get, Post, Request } from '@nestjs/common';
import { Transaction } from './transactions.model';
import { TransactionService } from './transaction.service';
import { TransactionPayload } from './verify.transaction.dto';
import { send } from 'process';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('send')
  async sendMoney(@Request() req: TransactionPayload) {
    const { id, status, sender, receiver, value } = req;
    return id;
  }
}
