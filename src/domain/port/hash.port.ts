

export interface IHash{
   hash(password: string): Promise<any>;
   compare(password: string , hashed: string): Promise<boolean>;
}