import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

const soapRequest: any = require('easy-soap-request');

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  deliveryFeesHtml: string

  constructor() {
    this.deliveryFeesHtml = ""
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
    this.deliveryFeesHtml = "Delivery fees: " + fees
  }

  reset() {
    this.deliveryFeesHtml = '';
  }
}
