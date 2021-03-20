export class Seller {
  public firstName: string;
  public lastName: string;
  public email: string;
  public walletId: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    walletId: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.walletId = walletId;
  }
}
