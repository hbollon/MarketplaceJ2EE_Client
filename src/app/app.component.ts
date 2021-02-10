import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const allProductsQuery = gql`
{
  products {
    name
    description
    quantity
    weight
    price
  }
}
`
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu = false;
  products: any[];
  loading = true;

  constructor(public router: Router, private apollo: Apollo) {
    this.products = []
  }

  ngOnInit() {
    this.fetchAllProducts()
  }

  fetchAllProducts() {
    this.apollo
      .query<any>({
        query: allProductsQuery
      })
      .subscribe(
        ({ data, loading }) => {
          this.products = data && data.products;
          this.loading = loading;
        }
      );
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
  }

}
