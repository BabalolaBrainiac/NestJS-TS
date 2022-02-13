import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './users.models';
import { createUser } from './createUsers.dto';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body('name') name: string, @Body('email') email: string): any {
    this.userService.createUser(name, email);
  }
}