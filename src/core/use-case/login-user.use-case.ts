import { emit } from 'process';
import { User } from 'src/core/domain/entities/user.entity';
import { LoginUserPort } from 'src/core/port/in/login-user.port';
import { IHash } from 'src/core/port/out/hash.port';
import { IUserRepository } from 'src/core/port/out/user.repo.port';

export class LoginUserUseCase implements LoginUserPort {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly Hasher: IHash,
  ) {}

  async execute(email: string, password: any): Promise<void> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('User doesnt exists');
    await this.Hasher.compare(password, user.password);
  }
}
