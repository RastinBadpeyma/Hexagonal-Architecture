// infrastructure/hash/bcrypt.adapter.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHash } from 'src/domain/port/out/hash.port';


@Injectable()
export class BcryptAdapter implements IHash {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(data, hashed);
  }
}
