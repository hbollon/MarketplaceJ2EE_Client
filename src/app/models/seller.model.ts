import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export class Seller {
  public firstName: string;
  public lastName: string;
  public email: string;
  public walletId: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    walletId: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.walletId = walletId;
  }
}
