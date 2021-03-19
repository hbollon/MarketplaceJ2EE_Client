import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';
import { SellProductDialogComponent } from './sell-product-dialog/sell-product-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Product } from './models/product.model';
import { MatDialog } from '@angular/material/dialog';

const allProductsQuery = gql`
{
  products {
    name
    description
    quantity
    weight
    price
    asset_url
  }
}
`
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showProducts = true;
  public showMenu = false;
  products: any[];
  loading = true;

  constructor(
    public router: Router,
    private apollo: Apollo,
    public sellingDialog: MatDialog
  ) {
    this.products = []
  }

  ngOnInit() {
    this.fetchAllProducts()
  }

  fetchAllProducts() {
    this.apollo
      .query<any>({
        query: allProductsQuery,
        fetchPolicy: 'network-only'
      })
      .subscribe(
        ({ data, loading }) => {
          this.products = data && data.products;
          this.loading = loading;
        }
      );
  }

  sendNewProduct(p: Product): void {
    const addProductQuery = gql`
    {
      sellProduct(
        name: "${p.name}",
        description: "${p.description}",
        ${p.quantity != 0 ? "quantity: "+p.quantity+","  : ""}
        weight: ${p.weight},
        price: ${p.price},
        ${p.assetUrl != "" ? "asset_url: "+p.assetUrl  : ""}
      )
    }
    `

    console.log(addProductQuery)
    this.apollo
      .query<any>({
        query: addProductQuery,
        fetchPolicy: 'network-only'
      })
      .subscribe(
        ({ data, error }) => {
          console.log(data)
          console.log(error)
          this.refreshList()
        }
      );
  }

  openSellingDialog() {
    const dialogRef = this.sellingDialog.open(SellProductDialogComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != false) {
        console.log(result);
        this.sendNewProduct(result)
      } else {
        console.log("dialog false");
      }
    });
  }

  openSellerRegisterDialog() {
    this.sellingDialog.open(SellerDialogComponent, {
      width: '320px',
    });
  }

  refreshList() {
    this.fetchAllProducts()
    this.showProducts = false
    setTimeout(() => this.showProducts = true);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
  }

}
