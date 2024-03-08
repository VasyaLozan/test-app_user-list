import {Directive, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appFormValidation]',
  standalone: true
})
export class FormValidationDirective implements OnInit, OnDestroy {

  constructor(
    private ngControl: NgControl,
    private elRef: ElementRef,
  ) {}

  sub: Subscription | undefined = new Subscription();

  @HostListener('blur') onBlur() {
    this.updateValidation();
  }

  ngOnInit() {
    this.sub = this.ngControl.valueChanges?.subscribe(() => {
      this.updateValidation();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updateValidation() {
    if (this.ngControl.control?.invalid) {
      this.elRef.nativeElement.classList.add('form-data_error-input');
    } else {
      this.elRef.nativeElement.classList.remove('form-data_error-input');
    }
  }
}
