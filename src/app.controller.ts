import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/auth-local';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  //Instantiate Auth service
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.agent);
  }
}
