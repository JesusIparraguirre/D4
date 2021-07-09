import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[validateNumber]',
})
export class UppercaseDirectiveDirective implements OnChanges {
  @Input() ngModel: string;

  constructor(private el: ElementRef) {
    (el.nativeElement as HTMLInputElement).value = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    (this.el.nativeElement as HTMLInputElement).value =
      (this.el.nativeElement as HTMLInputElement).value.length >= 1 ?
        (this.el.nativeElement as HTMLInputElement).value.substring(0, 1) :
        (this.el.nativeElement as HTMLInputElement).value;
  }
}
