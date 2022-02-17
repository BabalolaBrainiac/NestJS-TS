import { Module } from '@nestjs/common';
import { AgentModule } from 'src/agents/agents.module';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [AgentModule],
})
export class AuthModule {}
