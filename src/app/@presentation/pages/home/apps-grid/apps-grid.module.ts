import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsGridComponent } from './apps-grid.component';
import { NbCardModule, NbLayoutModule, NbListModule } from "@nebular/theme";
import { CommonComponentsModule } from "../../../common-components/common-components.module";


@NgModule({
  declarations: [AppsGridComponent],
  exports: [
    AppsGridComponent,
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    CommonComponentsModule,
    NbListModule,
    NbCardModule,
  ],
})
export class AppsGridModule { }
