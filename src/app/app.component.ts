import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material';

import { AuthService } from './core/services/auth/auth.service';
import { User } from './core/models/user';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'anime-nuke';
  @ViewChild('drawer', { static: false }) sidenavDrawer: MatDrawer;
  currentUser: User;
  notFoundPage: boolean = false;

  constructor(public auth: AuthService, private router: Router) { 

  }
    
  
  ngOnInit() {
    // if user present show side navigation
    this.auth.currentUser$.subscribe((x) => { 
      this.currentUser = x;
      if(this.currentUser) {
        setTimeout(() => {
          this.toggleSideNav();
        }, 100);
      }
    });    
  }

  ngAfterViewInit() {
     // if route is to 404 then hide things
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.notFoundPage = event.url.indexOf('404') > -1;
        console.log("test route", event.url);
      }
    });
  }

  toggleSideNav() {
    if(this.sidenavDrawer) {
      this.sidenavDrawer.toggle();
    }
  }

}
