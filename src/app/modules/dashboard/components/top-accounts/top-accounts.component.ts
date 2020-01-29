import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { topAccounts } from '../../models/data';

@Component({
  selector: 'app-top-accounts',
  templateUrl: './top-accounts.component.html',
  styleUrls: ['./top-accounts.component.scss']
})
export class TopAccountsComponent implements OnInit, OnDestroy {
  myTopAccountsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // new Observable === Observable.create
    let topAccountsObservable$ = Observable.create((subscriber: Subscriber<any>) => {

      // error
      if(document.title !== 'AnimeNuke') {
        subscriber.error('Incorrect Page Title');
      }

      // next
      for (let account of topAccounts) {
        subscriber.next(account);
      }

      // complete
      setTimeout(() => {
        subscriber.complete();
      }, 2000);

      // teardown code
      return () => console.log("Executing teardown code");

    });
    
    // subscribe to observable
    this.myTopAccountsSubscription = topAccountsObservable$.subscribe((account: any) => console.log("Account Name", account.name));
  }

  ngOnDestroy() {
    if(this.myTopAccountsSubscription) {
      this.myTopAccountsSubscription.unsubscribe();
    }
  }

}
