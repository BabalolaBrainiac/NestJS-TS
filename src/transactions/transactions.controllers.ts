import {
  Controller,
  Get,
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

  @Post('send')
  async sendMoney(@Request() req: TransactionPayload) {
    const { sender, receiver, value, date } = req;
    const creditTx = await this.transactionService.sendAsset(
      sender,
      receiver,
      value,
      new Date(),
    );
    if (!creditTx) {
      throw new UnauthorizedException();
    }
  }
}
