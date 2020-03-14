import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscriber, Subscription, of, from, concat, forkJoin, combineLatest, fromEvent } from 'rxjs';
import { topAccounts } from '../../models/data';

@Component({
  selector: 'app-top-accounts',
  templateUrl: './top-accounts.component.html',
  styleUrls: ['./top-accounts.component.scss']
})
export class TopAccountsComponent implements OnInit, OnDestroy {
  myTopAccountsSubscription: Subscription;
  @ViewChild('myButton', { static: true }) myButton: ElementRef;
  constructor() { }

  primaryCreation() {
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

  secondaryCreation() {
    // creating observables from existing data
    let source1$ = of('hello', 1, true, { name: "Sengoku" });
    source1$.subscribe(value => console.log("value1", value));
    console.log("-------------------------");
    let source2$ = from(topAccounts);
    source2$.subscribe(account => console.log("account name", account.name));
    console.log("-------------------------");
    combineLatest(source2$, source1$).subscribe(value => console.log(" 2 and 1 Combine Latest", value));
    console.log("-------------------------");
    concat(source2$, source1$).subscribe(value => console.log("2 and 1 Concat", value));
    console.log("-------------------------");
    forkJoin(source2$, source1$).subscribe(value => console.log("2 and 1 Fork Join", value));
  }

 
  ternaryCreation() {
    fromEvent(this.myButton.nativeElement, 'click').subscribe(event => {
      console.log("button event", event);
    });
  }

  ngOnInit() {
    this.secondaryCreation();
  }

  ngOnDestroy() {
    if(this.myTopAccountsSubscription) {
      this.myTopAccountsSubscription.unsubscribe();
    }
  }

}
