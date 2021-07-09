import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'code-item',
  templateUrl: './code-item.component.html',
  styleUrls: ['./code-item.component.scss'],
})
export class CodeItemComponent implements OnInit {

  @Input() nameValue: string = "";
  @Input() codeForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  isFocusCode1: boolean = false;

  focusInInputCode1($event) {
    this.isFocusCode1 = true;
  }

  focusOutInputCode1($event) {
    this.isFocusCode1 = false;
  }

  getColorBorderCode1() {
    if (this.isFocusCode1) {
      return '#003a70';
    } else {
      return '#e2e2e2';
    }
  }
}
