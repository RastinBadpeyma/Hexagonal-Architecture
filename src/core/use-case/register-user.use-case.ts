import { User } from 'src/core/domain/entities/user.entity';
import { RegisterUserPort } from 'src/core/port/in/register-user.port';
import { IHash } from 'src/core/port/out/hash.port';
import { IUserRepository } from 'src/core/port/out/user.repo.port';
import { RegisterUserDto } from 'src/dto/register.user.dto';

export class RegisterUserUseCase implements RegisterUserPort {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly Hasher: IHash,
  ) {}

  async execute(data: RegisterUserDto): Promise<void> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error('User already exists');
    const hashed = await this.Hasher.hash(data.password);
    const user = new User(0, data.email, hashed);
    await this.userRepo.save(user);
  }
}
