import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AgentModule } from 'src/agents/agents.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [AgentModule, PassportModule],
})
export class AuthModule {}
