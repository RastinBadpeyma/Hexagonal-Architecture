export interface LoginUserPort {
  execute(email: string, password: any): Promise<void>;
}
