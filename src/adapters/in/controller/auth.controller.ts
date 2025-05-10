// adapters/controller/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserPort } from 'src/core/port/in/login-user.port';
import { RegisterUserPort } from 'src/core/port/in/register-user.port';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: RegisterUserPort,
    private readonly login: LoginUserPort,
  ) {}

  @Post('register')
  registerUser(@Body() body: { email: string; password: any }) {
    return this.register.execute(body.email, body.password);
  }

  @Post('login')
  async loginUser(@Body() body: { email: string; password: string }) {
    const success = await this.login.execute(body.email, body.password);
    return { success };
  }
}
