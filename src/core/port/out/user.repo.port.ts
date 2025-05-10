import { User } from 'src/core/domain/entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
}
