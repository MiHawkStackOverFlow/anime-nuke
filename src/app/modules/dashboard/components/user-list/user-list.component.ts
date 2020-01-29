import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/users.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  editUser: any; // the user currently being edited

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getUsersSubscription: Subscription;

  constructor(private userService: UserService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    // Behavior Subject
    const subject = new BehaviorSubject(123);

    // two new subscribers will get initial value => output: 123, 123
    subject.subscribe(console.log);
    subject.subscribe(console.log);

    // two subscribers will get new value => output: 456, 456
    subject.next(456);

    // new subscriber will get latest value (456) => output: 456
    subject.subscribe(console.log);

    // all three subscribers will get new value => output: 789, 789, 789
    subject.next(789);

    // output: 123, 123, 456, 456, 456, 789, 789, 789

    // this component implementation below
    this.populateUsers();
  }

  updateTableData() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinnerService.hide();
  }
  
  populateUsers(): void {
    this.spinnerService.show();
    this.getUsersSubscription = this.userService.getUsers().subscribe((users) =>  {
      this.users = users;
      console.log("my users", this.users);    
      this.updateTableData();      
    });
  }

  updateUser(user: User) {
    this.editUser = user;
    // console.log("test edit user", user);
    if (this.editUser) {
      this.userService.updateUser(this.editUser)
        .subscribe(user => {
          // replace the user in the users list with update from server
          const ix = user ? this.users.findIndex(h => h.id === user.id) : -1;
          if (ix > -1) { this.users[ix] = user; }
          this.updateTableData();
        });
      this.editUser = undefined;
    }
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user.id).subscribe();
    this.updateTableData();
  }

  /** Mat table functions below */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if(this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
  }
}
