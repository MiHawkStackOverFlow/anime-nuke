import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AccountsComponent implements OnInit {
  registeredAccounts: any = [];
  nonRegisteredAccounts: any = [];
  dataSource = [];
  columnsToDisplay = ['accountId', 'username', 'email', 'website'];
  expandedElement: any | null;
  constructor(public accountService: AccountService,  private router: Router) { }

  ngOnInit() {
    this.accountService.getAccountDetails().subscribe(response => {
      let users = response[0];
      let details = response[1];

      console.log("users", users);
      console.log("details", details);
      
      users.forEach((user) => {
        let match = details.filter(detail => user.email === detail.email)[0];
        if(match) {
          let merged = { ...user, ...match };
          this.registeredAccounts.push(merged);
        } else {
          this.nonRegisteredAccounts.push(user);
        }
      });
      
      console.log("test finale", this.registeredAccounts);
      this.dataSource = this.registeredAccounts;
      
    });
  }

  goToUserDetails(): void {
    this.router.navigate(['/accounts/details']);
  }

}
