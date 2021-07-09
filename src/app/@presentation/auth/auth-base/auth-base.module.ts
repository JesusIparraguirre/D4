import {NgModule} from '@angular/core';
import {AuthBaseComponent} from './auth-base.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule} from '@nebular/theme';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "../auth-routing.module";
import {CommonComponentsModule} from "../../common-components/common-components.module";


@NgModule({
  declarations: [AuthBaseComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    CommonModule,
    NbIconModule,
    AuthRoutingModule,
    CommonComponentsModule,
  ],
})
export class AuthBaseModule { }
