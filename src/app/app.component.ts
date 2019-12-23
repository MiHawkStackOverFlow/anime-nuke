import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'anime-nuke';
  @ViewChild('drawer', {static: false }) sidenavDrawer: MatDrawer;
  currentUser: User;

  constructor(public auth: AuthService, private router: Router) {
    this.auth.currentUser$.subscribe(x => this.currentUser = x);
  }
  
  ngOnInit() {
    // this.currentUser = this.auth.currentUserValue;
    // console.log("test user", this.currentUser); 
  }

  toggleSideNav() {
    this.sidenavDrawer.toggle();
  }

  ngOnViewInit() {
    this.toggleSideNav();
  }

}
