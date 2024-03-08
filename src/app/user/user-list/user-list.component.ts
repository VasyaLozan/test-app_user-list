import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserModel} from "../user.models";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() userList: UserModel[] = [];

  @Output() selectUserViewEmitter: EventEmitter<UserModel> = new EventEmitter();

  selectUserView(user: UserModel) {
    this.selectUserViewEmitter.emit(user);
  }
}
