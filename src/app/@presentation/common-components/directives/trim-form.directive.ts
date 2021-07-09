import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[trimForm]'
})
export class TrimFormDirective {

  constructor(@Optional() private formControlName: FormControlName) { }
  @HostListener('blur')
  @HostListener('keydown.enter')
  trimValue() {
    const control = this.formControlName.control;
    if (typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  }
}
