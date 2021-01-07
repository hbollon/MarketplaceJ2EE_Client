import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
  toggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
