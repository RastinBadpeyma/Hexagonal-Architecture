import { User } from "src/domain/entities/user.entity";
import { IHash } from "src/domain/port/hash.port";
import { IUserRepository } from "src/domain/port/user.repo.port";


export class RegisterUserUseCase{
   constructor(
      private readonly userRepo : IUserRepository,
      private readonly Hasher: IHash,
   ){}

   async execute(email: string , password: string){
       const existing = await this.userRepo.findByEmail(email);
       if (existing) throw new Error('User already exists');
       const hashed = await this.Hasher.hash(password);
       const user = new User(0,email,hashed);
       return this.userRepo.save(user);
   }
}