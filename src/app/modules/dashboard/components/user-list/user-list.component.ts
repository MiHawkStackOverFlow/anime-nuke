import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User>;
  editUser: any; // the user currently being edited

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.populateUsers();
  }

  edit(user: User) {
    this.editUser = user;
  }

  populateUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  updateUser() {
    if (this.editUser) {
      this.userService.updateUser(this.editUser)
        .subscribe(user => {
          // replace the user in the users list with update from server
          const ix = user ? this.users.findIndex(h => h.id === user.id) : -1;
          if (ix > -1) { this.users[ix] = user; }
        });
      this.editUser = undefined;
    }
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
