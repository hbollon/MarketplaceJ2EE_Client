import { Client } from './client.model';
import { Product } from './product.model';

export class BuyRequest {
  public product: Product;
  public client: Client;

  constructor(product: Product, client: Client) {
    this.product = product;
    this.client = client;
  }


}
