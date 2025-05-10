export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: any,
  ) {
    this.validateEmail(email);
    this.validatePassword(password);
  }

  // Business Rules
  private validatePassword(password: any) {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
  }

  private validateEmail(email: string) {
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Invalid email address');
    }
  }
}
