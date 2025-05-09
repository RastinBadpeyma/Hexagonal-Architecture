import { User } from 'src/domain/entities/user.entity';
import { RegisterUserPort } from 'src/domain/port/in/register-user.port';
import { IHash } from 'src/domain/port/out/hash.port';
import { IUserRepository } from 'src/domain/port/out/user.repo.port';
import { RegisterUserDto } from 'src/application/dto/register.user.dto';

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
