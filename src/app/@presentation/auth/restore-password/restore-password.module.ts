import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestorePasswordComponent} from './restore-password.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonComponentsModule} from "../../common-components/common-components.module";
import {AppLoaderModule} from "../../app-loader/app-loader.module";


@NgModule({
  declarations: [
    RestorePasswordComponent
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    RouterModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    CommonComponentsModule,
    AppLoaderModule,

  ],
})
export class RestorePasswordModule { }
