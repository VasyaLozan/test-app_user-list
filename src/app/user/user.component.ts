import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserListComponent} from "./user-list/user-list.component";
import {UserViewComponent} from "./user-view/user-view.component";
import {UserModel} from "./user.models";
import {NgIf} from "@angular/common";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UserListComponent,
    UserViewComponent,
    NgIf
  ],
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  userView: 'none' | 'create' | 'view' = 'none';
  selectedUser: UserModel | null = null;
  userList: UserModel[] = [];

  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUserList();
  }

  createUserFrom() {
    this.closeUserFrom();
    this.userView = 'create';
    this.selectedUser = null;
  }

  viewUserFrom(user: UserModel) {
    this.closeUserFrom();
    this.userView = 'view';
    this.selectedUser = user;
  }

  closeUserFrom() {
    this.userView = 'none';
    this.selectedUser = null;
    this.successMessage = '';
    this.errorMessage = '';
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: response => {
        this.userList = response;
      },
      error: error => {
        this.errorMessage = 'Something wrong!';
      }
    });
  }

  saveUser(user: UserModel) {
    if (!parseInt(user.id)) {
      this.createUser(user);
    } else {
      this.updateUser(user);
    }
  }

  createUser(user: UserModel) {
    const findUser = this.userList.find(item => item.userName === user.userName);
    if (findUser) {
      this.errorMessage = 'Username already exist!';
    } else {
      this.userService.createUser({
        ...user,
        id: (this.userList.length + 1).toString()
      }).subscribe({
        next: response => {
          this.viewUserFrom(response);
          this.userList = [
            ...this.userList,
            response
          ];
          this.successMessage = 'User was created successfully!';
        },
        error: error => {
          this.errorMessage = 'Something wrong!';
        }
      });
    }
  }

  updateUser(user: UserModel) {
    this.userService.updateUser(user).subscribe({
      next: response => {
        this.selectedUser = response;
        this.userList = this.userList.map(user => {
          if (user.id !== response.id) {
            return user;
          } else {
            return response;
          }
        });
        this.successMessage = 'User was updated successfully!';
      },
      error: error => {
        this.errorMessage = 'Something wrong!';
      }
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: response => {
        this.closeUserFrom();
        this.userList = this.userList.filter(user => user.id !== userId);
        this.successMessage = 'User was deleted successfully!';
      },
      error: error => {
        this.errorMessage = 'Something wrong!';
      }
    });
  }
}
