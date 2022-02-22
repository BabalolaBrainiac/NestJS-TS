import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AgentCreateService } from './agent.service';
import { AgentMiddleware } from './agents.middleware';
import { AgentOperationService } from './agent.service';

@Module({
  exports: [AgentCreateService],
  providers: [AgentCreateService],
})
export class AgentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AgentMiddleware).forRoutes('agent');
  }
}
