import { emit } from "process";
import { User } from "src/domain/entities/user.entity";
import { IHash } from "src/domain/port/hash.port";
import { IUserRepository } from "src/domain/port/user.repo.port";


export class LoginUserUseCase{
   constructor(
      private readonly userRepo : IUserRepository,
      private readonly Hasher: IHash,
   ){}

   async execute(email: string , password: string){
       const user = await this.userRepo.findByEmail(email);
       if (!user) {
         return false;
       }
       return this.Hasher.compare(password , user.password)
   }
}