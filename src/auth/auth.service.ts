import { Injectable } from '@nestjs/common';
import { AgentCreateService } from 'src/agents/agent.service';
import { JwtService } from '@nestjs/jwt';
import { Agent } from 'src/agents/agents.model';

@Injectable()
export class AuthService {
  constructor(
    private agentCreate: AgentCreateService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // const stringedPassword = await hashedPassword.toString();
    const verifiedPassword = await this.agentCreate.comparePassword(
      userPassword,
      hashedPassword,
    );
    return verifiedPassword;
  }

  async validateAgent(id: string, password: string) {
    const agent = await this.agentCreate.findAgent(id);
    const stringPass = (await agent.password).toString();
    const valPass = await this.verifyPassword(password, stringPass);
    if (agent && valPass === false) {
      return 'Password is Incorrect. Verify password and try again';
    } else if (agent && valPass === true) {
      console.log('Agent Validation is Successful');
      const { password, ...result } = agent;
      return agent;
    }
    console.log('Could not return user');
  }

  async login(user: Agent) {
    const payload = { sub: user.id, name: user.name };
    return {
      accesstoken: this.jwtService.sign(payload),
    };
  }
}
