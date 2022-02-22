import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/auth-local';
import { JwtAuthGuard } from 'src/auth/jwt.authguard';

@Controller('agent')
export class AgentController {
  constructor(private authService: AuthService) {}
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const agent = req.user;
    console.log(agent);
    return this.authService.login(agent);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getAgentProfile(@Request() req) {
    const agent = req.user;
    console.log(agent);
    return agent;
  }
}
