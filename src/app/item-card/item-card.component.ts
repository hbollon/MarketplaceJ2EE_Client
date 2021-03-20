import { Component, Input, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from 'src/app/models/client.model'
import { ClientRegisterDialogComponent } from './../client-register-dialog/client-register-dialog.component';
import { BuyRequest } from '../models/buyRequest.model';
import { Product } from '../models/product.model';
import { Seller } from '../models/seller.model';

const soapRequest: any = require('easy-soap-request');

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
@Injectable()
export class ItemCardComponent implements OnInit {
  @Input()
    productQl: any;

  deliveryFeesHtml: string;
  client: Client;
  product!: Product;

  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.deliveryFeesHtml = "";
    this.client = new Client("", "", "");
  }

  ngOnInit(): void {
    this.product = new Product(
      new Seller(
        this.productQl.seller.firstName,
        this.productQl.seller.lastName,
        this.productQl.seller.email,
        this.productQl.seller.walletId
      ),
      this.productQl.name,
      this.productQl.description,
      this.productQl.quantity,
      this.productQl.weight,
      this.productQl.price,
      0,
      this.productQl.asset_url,
    )
  }

  getFeesFromXML(body: any): number {
    //Create a new DOMParser object.
    var domParser = new DOMParser();

    //Parse the XML string into an XMLDocument object using
    //the DOMParser.parseFromString() method.
    var xmlDocument = domParser.parseFromString(body, "text/xml");

    //Log it to the console
    console.log(xmlDocument);

    //Read returned fees
    var fees = xmlDocument.getElementsByTagName("return")[0].childNodes[0].nodeValue;
    if(fees != null)
      return +fees;
    else
      return -1;
  }

  async getDeliveryFee(weight: number): Promise<number> {
    const url =
      'https://51.178.42.90:8181/MarketplaceServer-1.0-SNAPSHOT/services/DeliveryFee?wsdl';
    const sampleHeaders = {
      'Content-Type': 'text/xml;charset=UTF-8',
    };
    const xml =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mar="http://MarketplaceServer.bitsplease.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <mar:CalculateDelivery>
          <arg0>` +
      weight +
      `</arg0>
        </mar:CalculateDelivery>
      </soapenv:Body>
    </soapenv:Envelope>`;

    return await (async () => {
      const { response } = await soapRequest({
        url: url,
        headers: sampleHeaders,
        xml: xml,
        timeout: 1000,
      }); // Optional timeout parameter(milliseconds)
      const { headers, body, statusCode } = response;
      console.log(headers);
      console.log(body);
      console.log(statusCode);

      return this.getFeesFromXML(body);
    })();
  }

  async showFees(weight: number) {
    const fees = await this.getDeliveryFee(weight);
    console.log(fees);
    if (this.product != null && fees != -1) {
      this.product.fees = fees;
      this.deliveryFeesHtml = "Delivery fees: " + fees + "€"
    } else {
      console.log("Error during delivery fees calculation.")
    }
  }

  openRegisterDialog() {
    console.log(this.productQl);
    const dialogRef = this.dialog.open(ClientRegisterDialogComponent, {
      width: '320px',
      data: {client: this.client}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != false) {
        this.client = result;
        console.log(this.client);
        this.buy()
      } else {
        console.log("dialog false");
      }
    });
  }

  async buy() {
    if (this.product != null) {
      this.product.fees = await this.getDeliveryFee(this.product.weight)
      console.log(this.product);
      var obj = new BuyRequest(this.product, this.client);
      var body = JSON.stringify(obj);
      console.log(body);
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      this.http.post<any>(
        "https://51.178.42.90:8181/MarketplaceServer-1.0-SNAPSHOT/rest/mangopay/pay",
        body,
        httpOptions
      ).subscribe(data => {
        console.log(data.RedirectURL);
        window.location.href = data.RedirectURL;
      });
    } else {
      console.log("Invalid product!")
    }
  }

  reset() {
    this.deliveryFeesHtml = '';
  }
}
