import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AgentModule } from 'src/agents/agents.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [
    AgentModule,
    PassportModule,
    JwtModule.register({
      secret: ConfigService.secretKey,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
