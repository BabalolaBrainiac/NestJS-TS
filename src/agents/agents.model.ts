import { TransactionType } from 'src/transactions/transactions.model';

export enum AuthenticationLevel {
  basicPermission,
  advancedPermissions,
  allPermissions,
}

export class Agent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly authLevel: AuthenticationLevel,
    public readonly ops: string[],
  ) {}
}
