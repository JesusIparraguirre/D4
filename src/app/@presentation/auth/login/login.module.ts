import {NgModule} from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppLoaderModule} from "../../app-loader/app-loader.module";

@NgModule({
    imports: [
        NbCardModule,
        NbLayoutModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        RouterModule,
        NbDialogModule.forChild(),
        CommonComponentsModule,
        ReactiveFormsModule,

        AppLoaderModule,
    ],
  declarations: [LoginComponent],
})
export class LoginModule { }
