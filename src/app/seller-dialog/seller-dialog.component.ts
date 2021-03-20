import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Seller } from 'src/app/models/seller.model'

@Component({
  selector: 'app-seller-dialog',
  templateUrl: './seller-dialog.component.html',
  styleUrls: ['./seller-dialog.component.scss']
})
export class SellerDialogComponent implements OnInit {
  loading = false;
  error: any;

  constructor(
    public dialogRef: MatDialogRef<SellerDialogComponent>,
    public router: Router,
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: Seller) {
      this.data = new Seller("", "", "", 0)
    }

  register(): void {
    const registerSellerQuery = gql`
    {
      registerSeller(
        firstName: "${this.data.firstName}",
        lastName: "${this.data.lastName}",
        email: "${this.data.email}"
      )
    }
    `
    this.loading = true;
    this.apollo
      .query<any>({
        query: registerSellerQuery,
        fetchPolicy: 'network-only'
      })
      .subscribe(
        ( result: any ) => {
          console.log(result.data)
          console.log(result.error)
          this.loading = result.loading;
          this.error = result.error;
        }
      );
    this.dialogRef.close(false);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

}
