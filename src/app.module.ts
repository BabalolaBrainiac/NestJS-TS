import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AgentModule } from './agents/agents.module';
import { AgentController } from './agents/agents.controllers';

@Module({
  imports: [AgentModule, AuthModule],
  controllers: [AgentController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
