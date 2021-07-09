import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './forgot-password.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule,} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonComponentsModule} from "../../common-components/common-components.module";
import {AppLoaderModule} from "../../app-loader/app-loader.module";


@NgModule({
  declarations: [ForgotPasswordComponent],
    imports: [CommonModule, NbLayoutModule, NbCardModule, NbIconModule, NbButtonModule, RouterModule, NbInputModule, ReactiveFormsModule,  CommonComponentsModule, AppLoaderModule],
})
export class ForgotPasswordModule { }
