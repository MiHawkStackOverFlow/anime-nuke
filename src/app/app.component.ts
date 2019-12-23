import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'anime-nuke';
  @ViewChild('drawer', {static: false }) sidenavDrawer: MatDrawer;
  currentUser: User;

  constructor(public auth: AuthService, private router: Router) {  }
  
  ngOnInit() {
    this.auth.currentUser$.subscribe((x) => { 
      this.currentUser = x;
      if(this.currentUser) {
        setTimeout(() => {
          this.toggleSideNav();
        }, 100);
      }
    });
  }

  toggleSideNav() {
    if(this.sidenavDrawer) {
      this.sidenavDrawer.toggle();
    }
  }

}
