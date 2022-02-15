import { Injectable } from '@nestjs/common';
import { Agent } from './agents.model';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { AuthenticationLevel } from './agents.model';
import { agent } from 'supertest';

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

  // //Create new Agent
  // async createAgent(
  //   id: string,
  //   name: string,
  //   email: string,
  //   Password: string,
  //   authLevel: AuthenticationLevel,
  //   opsPerformed: [],
  // ) {
  //   const userId = nanoid();
  //   const password = await this.hashPassword(Password);
  //   const newAgent = await new Agent(
  //     userId,
  //     name,
  //     email,
  //     password,
  //     authLevel,
  //     opsPerformed,
  //   );
  //   this.agentList.push(newAgent);
  // }

  //Sample Agent
  private readonly agentSamples = [
    {
      id: '001',
      name: 'Agent001',
      email: 'testagent001@email.com',
      password: this.hashPassword('testAgent001'),
      authLevel: 'basicPermission',
      ops: ['getUser', 'DeletedUser'],
    },
    {
      id: '002',
      name: 'Agent002',
      email: 'testagent002@email.com',
      password: this.hashPassword('testAgent002'),
      authLevel: 'advancedPermission',
      ops: ['getUser', 'DeletedUser', 'deleteTransaction'],
    },
    {
      id: '003',
      name: 'Agent003',
      email: 'testagent003@email.com',
      password: this.hashPassword('testAgent003'),
      authLevel: 'allpermissions',
      ops: ['getUser', 'DeletedUser', 'deleteAccount', 'deleteUser'],
    },
  ];

  //Test find agent
  async findAgent(name: string): Promise<Agent | undefined> {
    return this.agentSamples.find((name) => agent.name === name);
  }
}

//Agent Operations Service

@Injectable()
export class AgentOperationService {}
