import { Module } from '@nestjs/common';

import { AgentController } from './agents.controllers';
import { AgentCreateService } from './agent.service';
import { AgentOperationService } from './agent.service';

@Module({
  exports: [AgentCreateService],
  providers: [AgentCreateService, AgentOperationService],
})
export class AgentModule {}
