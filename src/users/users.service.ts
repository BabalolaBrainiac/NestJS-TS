import { Injectable } from '@nestjs/common';
import { User } from './users.models';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
  Users: User[] = [];

  async createUser(name: string, email: string) {
    const userId = nanoid();
    const walletId = nanoid();
    const newUser = new User(userId, name, email, walletId, 0);
    this.Users.push(newUser);
    console.log(`New User Created with the UserId ${newUser.id}`);
    return newUser;
  }

  fetchUsers() {
    return [...this.Users];
  }
}
