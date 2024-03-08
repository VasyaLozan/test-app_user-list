import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {UserModel} from "../user.models";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormValidationDirective} from "../directives/form-validation.directive";

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    FormValidationDirective
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnChanges, OnDestroy {
  @Input() mode: 'create' | 'view' = 'create';
  @Input() userData: UserModel | null = null;

  @Output() closeEmitter: EventEmitter<void> = new EventEmitter();
  @Output() saveEmitter: EventEmitter<UserModel> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter();

  userForm = new FormGroup({
    userName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    type: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required,
        Validators.minLength(8), Validators.pattern(/(?=.*[0-9])(?=.*[a-zA-Z])/g)]}),
    repeatPassword: new FormControl('',{nonNullable: true, validators: [Validators.required,
        Validators.minLength(8), Validators.pattern(/(?=.*[0-9])(?=.*[a-zA-Z])/g)]}),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && changes['userData'].currentValue) {
      this.userForm.patchValue({
        userName: this.userData?.userName,
        firstName: this.userData?.firstName,
        lastName: this.userData?.lastName,
        email: this.userData?.email,
        type: this.userData?.type,
        password: this.userData?.password,
        repeatPassword: this.userData?.password
      });
    }
  }

  ngOnDestroy() {
    this.userForm.reset();
  }

  submitForm() {
    const user: UserModel = {
      id: this.userData && this.userData.id ? this.userData.id : '0',
      userName: this.userForm.controls.userName.value,
      firstName: this.userForm.controls.firstName.value,
      lastName: this.userForm.controls.lastName.value,
      email: this.userForm.controls.email.value,
      type: this.userForm.controls.type.value,
      password: this.userForm.controls.password.value
    }
    this.saveEmitter.emit(user);
  }

  deleteUser() {
    this.deleteEmitter.emit(this.userData?.id);
  }

  closeForm() {
    this.closeEmitter.emit();
  }
}
