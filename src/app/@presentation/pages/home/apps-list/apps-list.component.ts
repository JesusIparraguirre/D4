import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {App} from "../../../../@data/model/app";
import {CommonComponentsModule} from "../../../common-components/common-components.module";

@Component({
  selector: ' apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss'],
})
export class AppsListComponent implements OnInit {
  @Input() esProximoLanzamiento: boolean = false;
  @Input() urlimg: string = "";
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() visible: boolean = false;

  @Input() searchApps: string;
  @Input() titleList: string;
  @Input() apps: App[];
  @Output() sendReloadApps: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  sendReload(reload: boolean) {
    this.sendReloadApps.emit(reload);
  }

  valideFuture() {
    return this.titleList === CommonComponentsModule.titleAppsFuture;
  }
}
