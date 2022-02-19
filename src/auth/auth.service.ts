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
    hashedPassword: Promise<string>,
  ): Promise<boolean> {
    const newHashed = (await hashedPassword).toString();
    const verPass = await this.agentCreate.comparePassword(
      userPassword,
      newHashed,
    );
    return verPass;
  }

  async validateAgent(id: string, password: string) {
    const agent = await this.agentCreate.findAgent(id);
    const valPass = await this.verifyPassword(password, agent.password);
    if (agent && valPass === false) {
      return 'Password is Incorrect. Verify password and try again';
    } else if (agent && valPass === true) {
      console.log('Agent Validation is Successful');
      return agent;
    }
  }

  async login(agent: Agent) {
    const agentPayload = { sub: agent.id, name: agent.name };
    return {
      access_token: this.jwtService.sign(agentPayload),
    };
  }
}
