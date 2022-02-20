import { Module } from '@nestjs/common';
import { AgentCreateService } from './agent.service';
import { AgentOperationService } from './agent.service';

@Module({
  exports: [AgentCreateService],
  providers: [AgentCreateService],
})
export class AgentModule {}
