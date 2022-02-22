import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AgentModule } from './agents/agents.module';
import { AgentController } from './agents/agents.controllers';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.authguard';
import { LocalAuthGuard } from './auth/auth-local';

@Module({
  imports: [AgentModule, AuthModule],
  controllers: [AgentController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LocalAuthGuard,
    // },
  ],
  exports: [AppService],
})
export class AppModule {}
