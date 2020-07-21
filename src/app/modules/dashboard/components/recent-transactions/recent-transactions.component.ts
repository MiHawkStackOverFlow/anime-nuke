import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { RecentTransactions } from './../../models/recent-trans';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

const GITHUB_URL = 'https://api.github.com/search/repositories?';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentTransactionsComponent implements OnInit {
  queries$ = new Subject<string>();
  searchResult$: Observable<RecentTransactions>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.searchResult$ = this.queries$.pipe(
        map((query: string) => query ? query.trim() : ''),
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => this.fetchRepositories(query))
    );
    // this.searchResult$.next();
    // this.queries$.next();
  }

  onTextChange(query: string): void {
    this.queries$.next(query);
  }

  private fetchRepositories(query: string): Observable<any> {
    const params = { q: query };
    return this.http.get<any>(GITHUB_URL, { params });
  }

}
