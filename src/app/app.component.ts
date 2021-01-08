import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMenu = false;
  userEmail = '';

  constructor(public router: Router) {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
  }

}
