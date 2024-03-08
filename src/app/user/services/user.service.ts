import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../user.models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000/userList';

  constructor(private api: HttpClient) { }

  getUserList() {
    return this.api.get<UserModel[]>(this.baseUrl);
  }

  createUser(user: UserModel) {
    return this.api.post<UserModel>(this.baseUrl, user);
  }

  updateUser(user: UserModel) {
    return this.api.patch<UserModel>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(userId: string) {
    return this.api.delete<UserModel>(`${this.baseUrl}/${userId}`);
  }
}
