import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  constructor(private router: Router, private authService: AuthService) { 
  }

 logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
 }

}
