// adapters/controller/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/use-case/login-user.use-case';
import { RegisterUserUseCase } from 'src/application/use-case/register-user.use-case';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: RegisterUserUseCase,
    private readonly login: LoginUserUseCase,
  ) {}

  @Post('register')
  registerUser(@Body() body: { email: string; password: string }) {
    return this.register.execute(body.email, body.password);
  }

  @Post('login')
  async loginUser(@Body() body: { email: string; password: string }) {
    const success = await this.login.execute(body.email, body.password);
    return { success };
  }
}
