import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { use } from 'passport';
import { nextTick } from 'process';

@Injectable()
export class AgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Implementing and Using Middleware');
    next();
  }
}
