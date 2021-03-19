import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
  @Input() state: any;
  toggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
    let change: SimpleChange = changes['state'];
    this.toggled = change.currentValue;
 }
}
