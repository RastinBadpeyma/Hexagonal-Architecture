import { RegisterUserDto } from 'src/application/dto/register.user.dto';

export interface RegisterUserPort {
  execute(data: RegisterUserDto): Promise<void>;
}
