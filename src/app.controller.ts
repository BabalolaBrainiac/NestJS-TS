import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/auth-local';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';

