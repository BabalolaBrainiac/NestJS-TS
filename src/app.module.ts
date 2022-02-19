import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AgentModule } from './agents/agents.module';
import { AgentController } from './agents/agents.controllers';

@Module({
  imports: [AgentModule, AuthModule],
  controllers: [AppController, AgentController],
  providers: [AppService],
})
export class AppModule {}
