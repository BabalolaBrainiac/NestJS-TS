import { Injectable } from '@nestjs/common';
import { Agent } from './agents.model';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { AuthenticationLevel } from './agents.model';

@Injectable()
export class AgentCreateService {
  private readonly agentList: Agent[] = [];

  //Hash Login Password
  async hashPassword(password: string): Promise<string> {
    const saltRound = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  //Compare Password
  async comarePassword(password, hashedPassword): Promise<boolean> {
    const ifValid = await bcrypt.compare(password, hashedPassword);
    return ifValid;
  }

  //Create new Agent
  async createAgent(
    name: string,
    email: string,
    Password: string,
    authLevel: AuthenticationLevel,
    opsPerformed: [],
  ) {
    const userId = nanoid();
    const password = await this.hashPassword(Password);
    const newAgent = await new Agent(
      userId,
      name,
      email,
      password,
      authLevel,
      opsPerformed,
    );
    this.agentList.push(newAgent);
  }
}

//Agent Operations Service

@Injectable()
export class AgentOperationService {}
