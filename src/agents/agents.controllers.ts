import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Agent } from './agents.model';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/auth-local';
import { JwtAuthGuard } from 'src/auth/jwt-authguard';

@Controller('agent')
export class AgentController {
  constructor(private authService: AuthService) {}
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getAgentProfile(@Request() req) {
    console.log(req.agent);
    return req.agent;
  }
}
