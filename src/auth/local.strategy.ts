import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id' });
  }

  async validateAgent(id: string, password: string) {
    const agent = await this.authService.validateAgent(id, password);
    if (!agent) {
      throw new UnauthorizedException();
    }
    return agent;
  }
}
