import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto)
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }
}
