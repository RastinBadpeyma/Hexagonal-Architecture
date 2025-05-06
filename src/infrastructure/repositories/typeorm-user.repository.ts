// infrastructure/repositories/typeorm-user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.orm.entity';
import { IUserRepository } from 'src/domain/port/out/user.repo.port';


@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOneBy({ email });
    if (!entity) return null;
    return new User(entity.id, entity.email, entity.password);
  }

  async save(user: User): Promise<User> {
    const entity = this.repo.create(user);
    const saved = await this.repo.save(entity);
    return new User(saved.id, saved.email, saved.password);
  }
}
