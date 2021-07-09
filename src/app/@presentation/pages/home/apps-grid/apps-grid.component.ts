import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { App } from "../../../../@data/model/app";
import { CommonComponentsModule } from "../../../common-components/common-components.module";

@Component({
  selector: 'apps-grid',
  templateUrl: './apps-grid.component.html',
  styleUrls: ['./apps-grid.component.scss'],
})
export class AppsGridComponent implements OnInit {

  @Input() esProximoLanzamiento: boolean = false;
  @Input() urlimg: string = "";
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() visible: boolean = false;

  @Input() searchApps: string;
  @Input() titleList: string;
  @Input() appsList: App[][] = [];
  @Input() appsListBase: App[] = [];
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
