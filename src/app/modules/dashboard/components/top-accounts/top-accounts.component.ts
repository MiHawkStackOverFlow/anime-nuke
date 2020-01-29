import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { topAccounts } from '../../models/data';

@Component({
  selector: 'app-top-accounts',
  templateUrl: './top-accounts.component.html',
  styleUrls: ['./top-accounts.component.scss']
})
export class TopAccountsComponent implements OnInit {

  constructor() { }

  subscribe(subscriber: Subscriber<any>): void {
    for (let account of topAccounts) {
      subscriber.next(account);
    }
  }

  ngOnInit() {
    let topAccountsObservable$ = new Observable(subscriber => {
      for (let account of topAccounts) {
        subscriber.next(account);
      }
    });
    topAccountsObservable$.subscribe((account: any) => console.log("Account Name", account.name));
  }

}
