import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AgentModule } from 'src/agents/agents.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    AgentModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret.secretKey,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
