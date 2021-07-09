import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSearchModule,
  NbTabsetModule,
} from "@nebular/theme";
import {AppsGridModule} from "./apps-grid/apps-grid.module";
import {AppsListModule} from "./apps-list/apps-list.module";
import {RouterModule} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbLayoutModule,
    NbSearchModule,
    NbActionsModule,
    NbIconModule,
    AppsGridModule,
    AppsListModule,
    // NbMenuModule,
    RouterModule,
    NbTabsetModule,
    AppsListModule,
    AppsGridModule,
    FormsModule,
    NbListModule,
    NbCardModule,
    NbButtonModule, 
    NbContextMenuModule,
    // NbMenuModule.forRoot(),
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
