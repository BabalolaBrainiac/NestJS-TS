import { Module } from '@nestjs/common';

import { AgentController } from './agents.controllers';
import { AgentCreateService } from './agent.service';
import { AgentOperationService } from './agent.service';

@Module({
  controllers: [AgentController],
  providers: [AgentCreateService, AgentOperationService],
})
export class AgentModule {}
