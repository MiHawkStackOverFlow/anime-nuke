import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'anime-nuke';
  @ViewChild('drawer', {static: false }) sidenavDrawer: MatDrawer;
  isLoggedIn = false;

  constructor(public auth: AuthService, private myRoute: Router) {}

  ngOnInit() {
    
  }

}
