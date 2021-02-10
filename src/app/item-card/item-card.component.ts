import { ClientRegisterDialogComponent } from './../client-register-dialog/client-register-dialog.component';
import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model'

const soapRequest: any = require('easy-soap-request');

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {

  @Input()
    product: any;

  deliveryFeesHtml: string;
  client: Client | null;

  constructor(public dialog: MatDialog) {
    this.deliveryFeesHtml = ""
    this.client = new Client("", "", "");
  }

  ngOnInit(): void {}

  getDeliveryFee(weight: number): void {
    const url =
      'http://localhost:8080/MarketplaceServer-1.0-SNAPSHOT/services/DeliveryFee?wsdl';
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

    (async () => {
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

      this.showFees(body)
    })();
  }

  showFees(body: string) {
    //Create a new DOMParser object.
    var domParser = new DOMParser();

    //Parse the XML string into an XMLDocument object using
    //the DOMParser.parseFromString() method.
    var xmlDocument = domParser.parseFromString(body, "text/xml");

    //Log it to the console
    console.log(xmlDocument);

    //Read returned fees
    var fees = xmlDocument.getElementsByTagName("return")[0].childNodes[0].nodeValue;
    console.log(fees);
    this.deliveryFeesHtml = "Delivery fees: " + fees + "€"
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(ClientRegisterDialogComponent, {
      width: '320px',
      data: {client: this.client}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.client = result;
      console.log(this.client);
    });
  }

  reset() {
    this.deliveryFeesHtml = '';
  }
}
