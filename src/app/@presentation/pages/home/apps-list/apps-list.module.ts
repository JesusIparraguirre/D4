import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppsListComponent} from './apps-list.component';
import {NbCardModule, NbIconModule, NbListModule} from "@nebular/theme";
import {CommonComponentsModule} from "../../../common-components/common-components.module";


@NgModule({
  declarations: [AppsListComponent],
  exports: [
    AppsListComponent,
  ],
  imports: [
    CommonModule,
    NbListModule,
    NbIconModule,
    CommonComponentsModule,
    NbCardModule,
  ],
})
export class AppsListModule { }
