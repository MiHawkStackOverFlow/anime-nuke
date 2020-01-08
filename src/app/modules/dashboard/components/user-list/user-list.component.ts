import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/users.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Array<User> = [];
  editUser: any; // the user currently being edited

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.populateUsers();
  }

  updateTableData() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  populateUsers(): void {
    this.userService.getUsers().subscribe((users) =>  { 
      this.users = users;
      console.log("my users", this.users);    
      this.updateTableData();      
    });
  }

  updateUser(user: User) {
    this.editUser = user;
    console.log("test edit user", user);
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
}
