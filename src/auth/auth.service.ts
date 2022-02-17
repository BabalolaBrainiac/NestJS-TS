import { Injectable } from '@nestjs/common';
import { AgentCreateService } from 'src/agents/agent.service';

@Injectable()
export class AuthService {
  constructor(private agentCreate: AgentCreateService) {}

  async verifyPassword(
    userPassword: string,
    hashedPassword: Promise<string>,
  ): Promise<boolean> {
    const verPass = await this.agentCreate.comparePassword(
      userPassword,
      hashedPassword,
    );
    return verPass;
  }

  async validateAgent(id: string, password: string) {
    const agent = await this.agentCreate.findAgent(id);
    const valPass = await this.verifyPassword(password, agent.password);

    if (agent && valPass === false) {
      return 'Password is Incorrect. Verify password and try again';
    } else if (agent && valPass === true) {
      return agent;
    }
  }
}
