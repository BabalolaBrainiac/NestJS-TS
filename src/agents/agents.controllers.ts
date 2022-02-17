import { Controller, Get, Post } from '@nestjs/common';
import { AgentCreateService } from './agent.service';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentCreateService) {}
}
