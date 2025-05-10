import { RegisterUserDto } from 'src/dto/register.user.dto';

export interface RegisterUserPort {
  execute(data: RegisterUserDto): Promise<void>;
}
