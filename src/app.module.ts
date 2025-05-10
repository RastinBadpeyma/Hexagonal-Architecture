// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './adapters/out/repositories/user.orm.entity';
import { TypeOrmUserRepository } from './adapters/out/repositories/typeorm-user.repository';
import { BcryptAdapter } from './adapters/out/auth/bcrypt.adapter';

import { AuthController } from './adapters/in/controller/auth.controller';
import { RegisterUserUseCase } from './core/use-case/register-user.use-case';
import { LoginUserUseCase } from './core/use-case/login-user.use-case';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rastin1380',
      database: 'hexagonal',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    BcryptAdapter,
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'IHashService',
      useClass: BcryptAdapter,
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo, hasher) =>
        new RegisterUserUseCase(userRepo, hasher),
      inject: ['IUserRepository', 'IHashService'],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepo, hasher) => new LoginUserUseCase(userRepo, hasher),
      inject: ['IUserRepository', 'IHashService'],
    },
  ],
})
export class AppModule {}
