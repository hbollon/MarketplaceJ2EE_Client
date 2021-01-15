import { Component, OnInit } from '@angular/core';

const soapRequest: any = require('easy-soap-request');

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

  }

  getDeliveryFee(weight : number) : void {
    const url = 'http://localhost:8080/MarketplaceServer-1.0-SNAPSHOT/services/DeliveryFee?wsdl';
    const sampleHeaders = {
      'Content-Type': 'text/xml;charset=UTF-8',
    };
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mar="http://MarketplaceServer.bitsplease.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <mar:CalculateDelivery>
          <arg0>` + weight + `</arg0>
        </mar:CalculateDelivery>
      </soapenv:Body>
    </soapenv:Envelope>`;

    (async () => {
      const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
      const { headers, body, statusCode } = response;
      console.log(headers);
      console.log(body);
      console.log(statusCode);
    })();

   }

}
