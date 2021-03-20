import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Seller } from '../models/seller.model';
import { Product } from './../models/product.model';

@Component({
  selector: 'app-sell-product-dialog',
  templateUrl: './sell-product-dialog.component.html',
  styleUrls: ['./sell-product-dialog.component.scss']
})
export class SellProductDialogComponent implements OnInit {
  public sellers: Array<{
    firstName: string;
    lastName: string;
    email: string;
    walletId: number;
  }>;

  constructor(
    public dialogRef: MatDialogRef<SellProductDialogComponent>,
    public router: Router,
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: Product) {
      this.data = new Product(new Seller("", "", "", 0), "", "", 0, 0.0, 0.0, 0.0, "")
      this.sellers = new Array<{
        firstName: string;
        lastName: string;
        email: string;
        walletId: number;
      }>();
    }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    const getSellersQuery = gql`
    {
      sellers {
        firstName
        lastName
        email
        walletId
      }
    }
    `

    this.apollo
      .query<any>({
        query: getSellersQuery,
        fetchPolicy: 'network-only'
      })
      .subscribe(
        ({ data, error }) => {
          console.log(data.sellers)
          this.sellers = data.sellers;
        }
      );
  }

}
