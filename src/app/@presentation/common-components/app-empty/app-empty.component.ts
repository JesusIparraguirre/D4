import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './app-empty.component.html',
  styleUrls: ['./app-empty.component.scss'],
})
export class AppEmptyComponent implements OnInit {

  @Input() urlimg: string;
  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}
