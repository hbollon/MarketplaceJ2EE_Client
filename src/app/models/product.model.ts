export class Product {
  public name: string;
  public description: string;
  public quantity: number;
  public weight: number;
  public price: number;
  public fees: number;
  public assetUrl: string;

  constructor(
    name: string,
    description: string,
    quantity: number,
    weight: number,
    price: number,
    fees: number,
    assetUrl: string
  ) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.weight = weight;
    this.price = price;
    this.fees = fees;
    this.assetUrl = assetUrl;
  }
}
